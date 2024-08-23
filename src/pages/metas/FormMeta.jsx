import { useEffect, useState } from "react";
import getPrioridad from "../../services/getPrioridad.js";
import "../../styles/FormMeta.css";
import axios from "axios";
import { Link } from "react-router-dom";

const FormMeta = ({ onClose = null }) => {
  const [priorities, setPriorities] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    priority: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    getPrioridad().then((data) => setPriorities(data));
  }, []);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "title":
        if (
          value.length < 5 ||
          value.length > 50 ||
          !/^[a-zA-Z\s\.\-\/\+]+$/.test(value)
        ) {
          error =
            "El título debe tener entre 5 y 50 caracteres y solo se permiten letras, puntos, guiones, plecas, signos + o -.";
        }
        break;

      case "amount":
        const amountPattern = /^\d+(\.\d{0,2})?$/;
        if (!amountPattern.test(value)) {
          error =
            "El monto objetivo debe ser un número entero.";
        } else {
          setForm((prevForm) => ({ ...prevForm, amount: value }));
        }
        break;

      case "priority":
        if (value === "" || value === "Alta") {
          error = "Debe seleccionar un nivel de prioridad válido.";
        }
        break;

      case "startDate":
        const startDate = new Date(value);
        const today = new Date();
        if (startDate < today) {
          error = "La fecha de inicio no puede ser anterior a hoy.";
        }
        break;

      case "endDate":
        const endDate = new Date(value);
        const start = new Date(form.startDate);
        if (
          endDate <= start ||
          endDate < new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000)
        ) {
          error =
            "La fecha de fin debe ser al menos una semana después de la fecha de inicio.";
        }
        break;

      case "description":
        if (value.length < 10 || value.length > 150) {
          error = "La descripción debe tener entre 10 y 150 caracteres.";
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
      !errors.title &&
      !errors.amount &&
      !errors.priority &&
      !errors.startDate &&
      !errors.endDate &&
      !errors.description &&
      updatedForm.title &&
      updatedForm.amount &&
      updatedForm.priority &&
      updatedForm.startDate &&
      updatedForm.endDate &&
      updatedForm.description;

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
      try {
        const token = sessionStorage.getItem("access_token");
        const response = await axios.post("https://node-api-latest.azurewebsites.net/metas/meta", form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        onClose(false);
        window.location.reload();
        console.log("Meta creada:", response.data);
      } catch (error) {
        console.error("Error al crear la meta:", error);
      }
    }
  };

  return (
    <form className="form-meta" onSubmit={handleSubmit}>
      <label htmlFor="title">Título de la meta</label>
      <input
        type="text"
        id="title"
        name="title"
        value={form.title}
        onChange={handleChange}
      />
      {errors.title && <p className="error">{errors.title}</p>}

      <label htmlFor="amount">Monto Objetivo</label>
      <input
        type="text"
        id="amount"
        name="amount"
        value={form.amount}
        onChange={handleChange}
      />
      {errors.amount && <p className="error">{errors.amount}</p>}

      <label htmlFor="priority">Nivel de Prioridad</label>
      <select
        id="priority"
        name="priority"
        value={form.priority}
        onChange={handleChange}
      >
        <option value="Alta">Seleccione una prioridad</option>
        {priorities.map(({ ID_Prioridad, Nombre }) => (
          <option key={ID_Prioridad} value={ID_Prioridad}>
            {Nombre}
          </option>
        ))}
      </select>
      {errors.priority && <p className="error">{errors.priority}</p>}

      <label htmlFor="startDate">Fecha de Inicio</label>
      <input
        type="date"
        id="startDate"
        name="startDate"
        value={form.startDate}
        onChange={handleChange}
      />
      {errors.startDate && <p className="error">{errors.startDate}</p>}

      <label htmlFor="endDate">Fecha de Fin</label>
      <input
        type="date"
        id="endDate"
        name="endDate"
        value={form.endDate}
        onChange={handleChange}
      />
      {errors.endDate && <p className="error">{errors.endDate}</p>}

      <label htmlFor="description">Descripción</label>
      <textarea
        id="description"
        name="description"
        value={form.description}
        onChange={handleChange}
      ></textarea>
      {errors.description && <p className="error">{errors.description}</p>}

      <button
        type="submit"
        className={!isFormValid ? "btn-disabled" : "btn-submit"}
      >
        Crear Meta
      </button>
    </form>
  );
};

export default FormMeta;
