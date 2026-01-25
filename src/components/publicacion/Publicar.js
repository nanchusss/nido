import { useState } from "react";
import styled from "styled-components";
import PasoBasico from "../components/publicar/PasoBasico";
import PasoUbicacion from "../components/publicar/PasoUbicacion";
import PasoDescripcion from "../components/publicar/PasoDescripcion";
import PasoImagenes from "../components/publicar/PasoImagenes";
import PasoPreview from "../components/publicar/PasoPreview";

const Publicar = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    operacion: "",
    tipo: "",
    titulo: "",
    precio: "",
    provincia: "",
    ciudad: "",
    direccion: "",
    descripcion: "",
    imagenes: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImagesChange = (imagenes) => {
    setFormData(prev => ({ ...prev, imagenes }));
  };

  const validate = () => {
    let err = {};

    if (!formData.operacion) err.operacion = "Requerido";
    if (!formData.tipo) err.tipo = "Requerido";
    if (formData.titulo.length < 10) err.titulo = "Mínimo 10 caracteres";
    if (!formData.precio || formData.precio <= 0) err.precio = "Precio inválido";
    if (!formData.provincia) err.provincia = "Requerido";
    if (!formData.ciudad) err.ciudad = "Requerido";
    if (formData.descripcion.length < 30) err.descripcion = "Mínimo 30 caracteres";
    if (formData.imagenes.length === 0) err.imagenes = "Subí al menos una imagen";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "imagenes") {
        value.forEach(img => payload.append("imagenes", img));
      } else {
        payload.append(key, value);
      }
    });

    console.log("ENVIAR AL BACKEND", payload);

    // fetch("/api/publicar", { method: "POST", body: payload });
  };

  return (
    <Container>
      <Progress>
        {[1,2,3,4,5].map(n => (
          <Dot key={n} active={step >= n}>{n}</Dot>
        ))}
      </Progress>

      {step === 1 && <PasoBasico data={formData} errors={errors} onChange={handleChange} />}
      {step === 2 && <PasoUbicacion data={formData} errors={errors} onChange={handleChange} />}
      {step === 3 && <PasoDescripcion data={formData} errors={errors} onChange={handleChange} />}
      {step === 4 && <PasoImagenes imagenes={formData.imagenes} errors={errors} onChange={handleImagesChange} />}
      {step === 5 && <PasoPreview data={formData} />}

      <Actions>
        {step > 1 && <Btn onClick={() => setStep(step - 1)}>Atrás</Btn>}
        {step < 5
          ? <Primary onClick={() => setStep(step + 1)}>Continuar</Primary>
          : <Primary onClick={handleSubmit}>Publicar</Primary>}
      </Actions>
    </Container>
  );
};

export default Publicar;

const Container = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 40px 20px;
`;

const Progress = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
`;

const Dot = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ active }) => (active ? "#ff7a00" : "#ddd")};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
`;

const Btn = styled.button`
  padding: 12px 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: white;
`;

const Primary = styled(Btn)`
  background: #ff7a00;
  color: white;
  border: none;
`;

