import { useEffect, useState } from "react";
import styled from "styled-components";

const PasoImagenes = ({ imagenes, errors, onChange }) => {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const urls = imagenes.map(f => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach(u => URL.revokeObjectURL(u));
  }, [imagenes]);

  return (
    <Card>
      <input type="file" multiple accept="image/*"
        onChange={(e) => onChange([...imagenes, ...Array.from(e.target.files)])}
      />

      {errors.imagenes && <Error>{errors.imagenes}</Error>}

      <Grid>
        {previews.map((src, i) => (
          <img key={i} src={src} alt="" />
        ))}
      </Grid>
    </Card>
  );
};

export default PasoImagenes;

const Card = styled.section`
  background: white;
  padding: 24px;
  border-radius: 12px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  margin-top: 16px;

  img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const Error = styled.p`
  color: #d32f2f;
`;

