import { useEffect, useState } from "react";
import styled from "styled-components";

const PerfilAjustes = () => {
  const [form, setForm] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("profile"));
    if (stored) setForm(stored);
  }, []);

  if (!form) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, logo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(form));
    alert("Perfil actualizado");
  };

  return (
    <Page>
      <h1>Ajustes del perfil</h1>

      <Section>
        <Label>Logo</Label>
        <LogoRow>
          {form.logo ? <img src={form.logo} alt="Logo" /> : <Placeholder />}
          <input type="file" accept="image/*" onChange={handleLogoChange} />
        </LogoRow>
      </Section>

      <Section>
        <Label>Nombre</Label>
        <Input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
        />
      </Section>

      <Section>
        <Label>Descripción</Label>
        <Textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
        />
      </Section>

      <Grid>
        <Section>
          <Label>Email</Label>
          <Input
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </Section>

        <Section>
          <Label>Teléfono</Label>
          <Input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
          />
        </Section>

        <Section>
          <Label>Web</Label>
          <Input
            name="web"
            value={form.web}
            onChange={handleChange}
          />
        </Section>

        <Section>
          <Label>Dirección</Label>
          <Input
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
          />
        </Section>
      </Grid>

      <SaveBtn onClick={handleSave}>Guardar cambios</SaveBtn>
    </Page>
  );
};

export default PerfilAjustes;

/* ===== styles ===== */

const Page = styled.div`
  max-width: 900px;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  font-weight: 600;
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px;
  min-height: 100px;
  border-radius: 10px;
  border: 1px solid #ddd;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  img {
    width: 120px;
    height: 120px;
    border-radius: 16px;
    object-fit: cover;
  }
`;

const Placeholder = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 16px;
  background: #f3f3f3;
`;

const SaveBtn = styled.button`
  margin-top: 20px;
  background: #ff7a00;
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
`;
