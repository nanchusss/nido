import { useState } from 'react';
import styled from 'styled-components';
import ProDemoModal from './ProDemoModal';

export default function ProBlock() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Block>
        <h4>✨ Mostrá el potencial de tu propiedad</h4>
        <p>Decoración virtual con IA para vender mejor.</p>
        <button onClick={() => setOpen(true)}>Ver ejemplo</button>
      </Block>

      {open && <ProDemoModal onClose={() => setOpen(false)} />}
    </>
  );
}