import styled from "styled-components";

const PasoBasico = ({ data, errors, onChange }) => (
  <Card>
    <Select name="operacion" value={data.operacion} onChange={onChange}>
      <option value="">Operación</option>
      <option value="venta">Venta</option>
      <option value="alquiler">Alquiler</option>
    </Select>
    {errors.operacion && <Error>{errors.operacion}</Error>}

    <Select name="tipo" value={data.tipo} onChange={onChange}>
      <option value="">Tipo</option>
      <option value="casa">Casa</option>
      <option value="departamento">Departamento</option>
    </Select>
    {errors.tipo && <Error>{errors.tipo}</Error>}

    <Input name="titulo" placeholder="Título" value={data.titulo} onChange={onChange} />
    {errors.titulo && <Error>{errors.titulo}</Error>}

    <Input type="number" name="precio" placeholder="Precio" value={data.precio} onChange={onChange} />
    {errors.precio && <Error>{errors.precio}</Error>}
  </Card>
);

export default PasoBasico;

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

const Select = styled(Input).attrs({ as: "select" })``;

const Error = styled.p`
  color: #d32f2f;
  font-size: 14px;
  margin-bottom: 12px;
`;
