import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { loadGoogleMaps } from '../utils/loadGoogleMaps';
import { barriosPorDepartamento } from '../data/barriosMendoza';

function NewProperty({ onSubmit }) {
  const addressRef = useRef(null);
  const mapRef = useRef(null);

  const [form, setForm] = useState({
    title: '',
    price: '',
    department: '',
    neighborhoodId: '',
    address: '',
    lat: null,
    lng: null
  });

  const departamentos = Object.keys(barriosPorDepartamento);

  const barriosDisponibles =
    form.department && barriosPorDepartamento[form.department]
      ? barriosPorDepartamento[form.department]
      : [];

  useEffect(() => {
    let marker = null;
    let map = null;
    let autocomplete = null;

    loadGoogleMaps()
      .then((google) => {
        if (!addressRef.current) return;

        autocomplete = new google.maps.places.Autocomplete(
          addressRef.current,
          {
            types: ['address'],
            componentRestrictions: { country: 'ar' }
          }
        );

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (!place || !place.geometry) return;

          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();

          setForm((prev) => ({
            ...prev,
            address: place.formatted_address,
            lat,
            lng
          }));

          map = new google.maps.Map(mapRef.current, {
            center: { lat, lng },
            zoom: 16,
            disableDefaultUI: true
          });

          marker = new google.maps.Marker({
            map,
            position: { lat, lng },
            icon: {
              url: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png'
            }
          });
        });
      })
      .catch((err) => {
        console.error('Google Maps error:', err);
      });

    return () => {
      if (marker) marker.setMap(null);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'department' && { neighborhoodId: '' })
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Page>
      <Container>
        <Header>
          <Title>Publicar propiedad</Title>
          <Subtitle>Datos principales y ubicación</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          <Field>
            <Label>Título</Label>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </Field>

          <Field>
            <Label>Precio</Label>
            <Input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </Field>

          <Field>
            <Label>Departamento</Label>
            <Select
              name="department"
              value={form.department}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar</option>
              {departamentos.map((dep) => (
                <option key={dep} value={dep}>
                  {dep.replace(/_/g, ' ')}
                </option>
              ))}
            </Select>
          </Field>

          <Field>
            <Label>Barrio</Label>
            <Select
              name="neighborhoodId"
              value={form.neighborhoodId}
              onChange={handleChange}
              disabled={!form.department}
              required
            >
              <option value="">Seleccionar</option>
              {barriosDisponibles.map((barrio) => (
                <option key={barrio.id} value={barrio.id}>
                  {barrio.name}
                </option>
              ))}
            </Select>
          </Field>

          <Field>
            <Label>Dirección</Label>
            <Input
              ref={addressRef}
              placeholder="Calle y número"
              autoComplete="off"
            />
          </Field>

          <Map ref={mapRef} />

          <Primary type="submit">
            Guardar y continuar
          </Primary>
        </Form>
      </Container>
    </Page>
  );
}

export default NewProperty;

/* ================= STYLES ================= */
const Page = styled.div`
  padding-top: 200px;
  background: #f6f6f6;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 0 28px 160px;
`;

const Header = styled.div`
  margin-bottom: 44px;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 10px;
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  font-size: 17px;
  color: #666;
  line-height: 1.4;
`;

const Form = styled.form`
  background: #ffffff;
  padding: 52px;
  border-radius: 32px;
  box-shadow: 0 40px 90px rgba(0,0,0,0.08);
`;

const Field = styled.div`
  margin-bottom: 30px;
`;

const Label = styled.label`
  display: block;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #222;
`;

const Input = styled.input`
  width: 100%;
  padding: 20px 18px;
  font-size: 16px;
  border-radius: 18px;
  border: 1px solid #ddd;
  transition: border 0.15s ease, box-shadow 0.15s ease;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: #F27C38;
    box-shadow: 0 0 0 3px rgba(242,124,56,0.15);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 20px 18px;
  font-size: 16px;
  border-radius: 18px;
  border: 1px solid #ddd;
  background: white;
  transition: border 0.15s ease, box-shadow 0.15s ease;

  &:focus {
    outline: none;
    border-color: #F27C38;
    box-shadow: 0 0 0 3px rgba(242,124,56,0.15);
  }
`;

const Map = styled.div`
  height: 320px;
  border-radius: 24px;
  background: #eaeaea;
  margin: 44px 0 56px;
`;

const Primary = styled.button`
  width: 100%;
  background: #F27C38;
  color: white;
  padding: 22px;
  border-radius: 22px;
  border: none;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 20px 45px rgba(242,124,56,0.45);
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 26px 55px rgba(242,124,56,0.55);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 18px 40px rgba(242,124,56,0.4);
  }
`;