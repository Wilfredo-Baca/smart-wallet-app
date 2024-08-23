import { useState, useEffect } from "react";
import getAccountsByUserID from "../../services/getAccounts";
import { formatCurrency } from "../../utils/formatNum";
import axios from "axios";

const FormMeta = ({ id = 0 }) => {
  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState({
    account: "",
    amount: "",
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    getAccountsByUserID().then((data) => setAccounts(data));
  }, []);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "account":
        if (value === "" || value === "Seleccione una cuenta") {
          error = "Debe seleccionar una cuenta válida.";
        }
        break;

      case "amount":
        const amountPattern = /^\d+$/;
        if (!amountPattern.test(value)) {
          error = "El monto debe ser un número entero válido.";
        }
        break;

      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    validateForm({ ...form, [name]: value });
  };

  const validateForm = (updatedForm) => {
    const isFormValid =
      !errors.account &&
      !errors.amount &&
      updatedForm.account &&
      updatedForm.amount;

    setIsFormValid(isFormValid);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      const data = {
        IDCuentaOrigen: form.account,
        Monto: form.amount,
        IDMeta: id,
      };
      try {
        const token = sessionStorage.getItem("access_token");
        const response = await axios.put("webapp-api-sw-dev.azurewebsites.net/metas/ingreso", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        window.location.reload();
      } catch (error) {
        console.error("Error al crear la meta:", error);
      }
      console.log("Formulario válido. Enviar datos:", data);
    } else {
      console.log("Formulario inválido.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ingresar al ahorro</h2>
      <label htmlFor="select-account">Seleccione la cuenta origen:</label>
      <select
        id="select-account"
        name="account"
        value={form.account}
        onChange={handleChange}
      >
        <option value="">Seleccione una cuenta</option>
        {accounts.map((account) => (
          <option key={account.ID_Cuenta} value={account.ID_Cuenta}>
            Núm: {account.NumeroCuenta} - Saldo: {formatCurrency(account.Saldo)}
          </option>
        ))}
      </select>
      {errors.account && <p className="error">{errors.account}</p>}

      <label htmlFor="amount">Indique el Monto</label>
      <input
        type="text"
        id="amount"
        name="amount"
        value={form.amount}
        onChange={handleChange}
      />
      {errors.amount && <p className="error">{errors.amount}</p>}

      <button type="submit" disabled={!isFormValid}>
        Transferir
      </button>
    </form>
  );
};

export default FormMeta;