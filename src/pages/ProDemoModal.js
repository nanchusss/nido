import styled from 'styled-components';

export default function ProDemoModal({ onClose }) {
  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <h3>Vista previa · Nido Pro</h3>

        <Images>
          <img src="/demo-before.jpg" alt="antes" />
          <Demo>
            <img src="/demo-after.jpg" alt="después" />
            <Watermark>NIDO PRO · DEMO</Watermark>
          </Demo>
        </Images>

        <button>Activar versión Pro</button>
      </Modal>
    </Overlay>
  );
}