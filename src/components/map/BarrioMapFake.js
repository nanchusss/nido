import styled from 'styled-components';

const MapWrapper = styled.div`
  height: 360px;
  background: #e9e5dd;
  border-radius: 16px;
  margin-bottom: 24px;
  position: relative;
`;

const Tooltip = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: #F27C38;
  color: white;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 0.8rem;
`;

export default function BarrioMapFake() {
  return (
    <MapWrapper>
      <Tooltip>0 viviendas</Tooltip>
    </MapWrapper>
  );
}
