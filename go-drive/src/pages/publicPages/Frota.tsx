import Header from "../../componentes/Header/Header";
import Footer from "../../componentes/Footer/Footer";
import CardPopUp from "../../componentes/CardPopUp/CardPopUp";
import Button from "../../componentes/Button/Button";
import '../../index.css';
import styled from 'styled-components';
import { IoCalendarOutline } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";

// --- Cores ---
const VERDE = "#84ff00";
const LABEL_COLOR = "#000"; // no print o label está escuro; troque por "#D9D9D9" se quiser mais legível

// --- Styled-Components ---

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const Group = styled.div<{ $flex: number }>`
  flex: ${({ $flex }) => $flex} 1 0;
  min-width: 0;
  height: 83px;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 16px;
  box-sizing: border-box;

  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 16px;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  @media (max-width: 1024px) {
    flex: none;
    width: 100%;
  }
`;

const Field = styled.div<{ $flex?: number }>`
  flex: ${({ $flex }) => $flex ?? 1} 1 0;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IconWrap = styled.span`
  display: flex;
  align-items: center;
  color: ${VERDE};
  font-size: 24px;
`;

const FieldColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 0;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: ${LABEL_COLOR};
  line-height: 1;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-family: inherit;
  font-size: 15px;
  font-weight: 700;
  color-scheme: dark;

  &::placeholder {
    color: #fff;
    font-weight: 400;
    opacity: 1;
  }

  /* esconde o ícone nativo do calendário/relógio (usamos o nosso) */
  &::-webkit-calendar-picker-indicator {
    display: none;
  }
`;

const SearchButtonGroup = styled.div`
  flex: 0.89 1 0;
  min-width: 0;
  display: flex;

  @media (max-width: 1024px) {
    flex: none;
    width: 100%;
  }
`;

// --- Componente Frota ---

function Frota() {
  return (
    <div className="pagina">
      <Header />
      <main className="conteudo">
        <CardPopUp maxWidth="1200px" padding="60px 20px">
          <SearchBarContainer>

            {/* 1. Local de Retirada */}
            <Group $flex={1.34}>
              <Field>
                <IconWrap><MdLocationOn /></IconWrap>
                <FieldColumn>
                  <Label htmlFor="location">Local retirada</Label>
                  <StyledInput
                    id="location"
                    name="location"
                    type="text"
                    placeholder="Cidade, Aeroporto ou estação"
                    style={{ fontWeight: 400 }}
                  />
                </FieldColumn>
              </Field>
            </Group>

            {/* 2. Data e Hora de Retirada */}
            <Group $flex={1}>
              <Field $flex={1.5}>
                <IconWrap><IoCalendarOutline /></IconWrap>
                <FieldColumn>
                  <Label htmlFor="pickupDate">data retirada</Label>
                  <StyledInput id="pickupDate" name="pickupDate" type="date" />
                </FieldColumn>
              </Field>
              <Field $flex={1}>
                <FieldColumn>
                  <Label htmlFor="pickupTime">Hora</Label>
                  <StyledInput id="pickupTime" name="pickupTime" type="time" />
                </FieldColumn>
              </Field>
            </Group>

            {/* 3. Data e Hora de Devolução */}
            <Group $flex={1}>
              <Field $flex={1.5}>
                <IconWrap><IoCalendarOutline /></IconWrap>
                <FieldColumn>
                  <Label htmlFor="returnDate">devolução</Label>
                  <StyledInput id="returnDate" name="returnDate" type="date" />
                </FieldColumn>
              </Field>
              <Field $flex={1}>
                <FieldColumn>
                  <Label htmlFor="returnTime">Hora</Label>
                  <StyledInput id="returnTime" name="returnTime" type="time" />
                </FieldColumn>
              </Field>
            </Group>

            
            <SearchButtonGroup>
              <Button width="100%" height="83px" borderRadius="16px" fontWeight="700">
                Buscar
              </Button>
            </SearchButtonGroup>

          </SearchBarContainer>
        </CardPopUp>
      </main>
      <Footer />
    </div>
  );
}

export default Frota;