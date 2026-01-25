import styled from "styled-components";

const PasoUbicacion = ({ data, errors, onChange }) => (
  <Card>
    <Input name="provincia" placeholder="Provincia" value={data.provincia} onChange={onChange} />
    {errors.provincia && <Error>{errors.provincia}</Error>}

    <Input name="ciudad" placeholder="Ciudad" value={data.ciudad} onChange={onChange} />
    {errors.ciudad && <Error>{errors.ciudad}</Error>}

    <Input name="direccion" placeholder="Dirección" value={data.direccion} onChange={onChange} />
  </Card>
);

export default PasoUbicacion;

const Card = styled.section`
  background: white;
  padding: 24px;
  border-radius: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 6px;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const Error = styled.p`
  color: #d32f2f;
  font-size: 14px;
  margin-bottom: 12px;
`;

