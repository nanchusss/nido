import styled from "styled-components";

const PasoPreview = ({ data }) => (
  <Card>
    <h2>{data.titulo}</h2>
    <strong>${data.precio}</strong>
    <p>{data.ciudad}, {data.provincia}</p>

    <Gallery>
      {data.imagenes.map((f, i) => (
        <img key={i} src={URL.createObjectURL(f)} alt="" />
      ))}
    </Gallery>

    <p>{data.descripcion}</p>
  </Card>
);

export default PasoPreview;

const Card = styled.section`
  background: white;
  padding: 32px;
  border-radius: 16px;
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  margin: 24px 0;

  img {
    width: 100%;
    height: 140px;
    object-fit: cover;
    border-radius: 8px;
  }
`;
