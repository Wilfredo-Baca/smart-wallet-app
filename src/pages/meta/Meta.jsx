import { useEffect, useState } from "react";
import BarChart from "./BarChart";
import { useParams } from "react-router-dom";
import getMetaById from "../../services/getMetaByid";
import CardMeta from "../../components/card/CardMeta";
import { generarData } from "../../utils/generateData";
import Modal from "../../components/modal/Modal";
import FormMeta from "./FormMeta";
import "../../styles/Meta.css";

const SmartWallet = () => {
  const { id } = useParams();
  const [meta, setMeta] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    getMetaById(id).then((data) => {
      setMeta(data[0]);
      setIsLoading(false); 
    });
  }, [id]);

  if (isLoading) {
    return <h2>Obteniendo información...</h2>; 
  }

  return (
    <div className="container-barData">
      <h2 className="title-page">
        <span>
          <svg
            width="60"
            height="60"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="M31.25 22.9166V22.937"
                stroke="#EC7C69"
                strokeWidth={2}
                strokeLinecap="round"
              />
              <path
                d="M10.7773 17.4541C9.86354 16.7518 9.16176 15.8106 8.74951 14.7344C8.33725 13.6582 8.23058 12.489 8.44129 11.356C8.65199 10.2229 9.17186 9.17023 9.94345 8.31419C10.715 7.45815 11.7083 6.83211 12.8134 6.50527C13.9185 6.17843 15.0925 6.16352 16.2056 6.46217C17.3187 6.76083 18.3275 7.36142 19.1206 8.19758C19.9137 9.03374 20.4601 10.0729 20.6996 11.2002C20.939 12.3275 20.8621 13.4991 20.4773 14.5854"
                stroke="#EC7C69"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M33.3335 8.33337V16.2563C35.9119 17.7482 37.8749 20.1093 38.871 22.9167H41.6648C42.2173 22.9167 42.7472 23.1362 43.1379 23.5269C43.5286 23.9176 43.7481 24.4475 43.7481 25V29.1667C43.7481 29.7192 43.5286 30.2491 43.1379 30.6398C42.7472 31.0305 42.2173 31.25 41.6648 31.25H38.8689C38.1689 33.2292 36.9794 35 35.4148 36.4021V40.625C35.4148 41.4538 35.0855 42.2487 34.4995 42.8348C33.9134 43.4208 33.1186 43.75 32.2898 43.75C31.461 43.75 30.6661 43.4208 30.0801 42.8348C29.494 42.2487 29.1648 41.4538 29.1648 40.625V39.4105C28.4763 39.5258 27.7795 39.5836 27.0814 39.5834H18.7481C18.0501 39.5836 17.3532 39.5258 16.6648 39.4105V40.625C16.6648 41.4538 16.3355 42.2487 15.7495 42.8348C15.1634 43.4208 14.3686 43.75 13.5398 43.75C12.711 43.75 11.9161 43.4208 11.3301 42.8348C10.744 42.2487 10.4148 41.4538 10.4148 40.625V36.4584V36.4021C8.5272 34.7146 7.1966 32.4936 6.59911 30.0331C6.00163 27.5726 6.16542 24.9887 7.06882 22.6234C7.97222 20.2581 9.57261 18.2229 11.6582 16.7872C13.7437 15.3515 16.2161 14.583 18.7481 14.5834H23.9564L33.3314 8.33337H33.3335Z"
                stroke="#EC7C69"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_2643_115">
                <rect width="50" height="50" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>
        {meta.NombreMeta}
      </h2>
      <button className="btn-crear-meta" onClick={openModal}>
        Ingresar al ahorro
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <FormMeta id={id} />
      </Modal>
      <section className="progress-section">
        <h3>Progreso del ahorro:</h3>
        <BarChart data={generarData(meta)} />
      </section>
      <CardMeta meta={meta} />
    </div>
  );
};

export default SmartWallet;
