import styled from "styled-components";

const PasoDescripcion = ({ data, errors, onChange }) => (
  <Card>
    <Textarea
      name="descripcion"
      rows="6"
      value={data.descripcion}
      onChange={onChange}
      placeholder="Descripción"
    />
    {errors.descripcion && <Error>{errors.descripcion}</Error>}
  </Card>
);

export default PasoDescripcion;

const Card = styled.section`
  background: white;
  padding: 24px;
  border-radius: 12px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const Error = styled.p`
  color: #d32f2f;
  font-size: 14px;
`;
