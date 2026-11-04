//import type deixa explícito que você está importando apenas tipos do TypeScript, e não valores utilizados em tempo de execução.
// 
import type {CSSProperties,InputHTMLAttributes,ReactNode} from "react";  

type InputProps = InputHTMLAttributes<HTMLInputElement> & {  //esse HTMLInputElement funciona mais ou menos assim NomeDoTipo<TipoDoElemento> chama os atributos dele e do lado o elemento em si.
  label?: string;
  labelStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;          // declara tudo que quer no componente oq ele aceita
  borderColor?: string;
  placeholderColor?: string;
  borderRadius?: number;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  iconColor?: string;
  iconSize?: number;
};

function Input({
  label,
  labelStyle,
  containerStyle,
  width = "100%",
  height = 48,
  backgroundColor = "#ffffff",
  borderColor = "#d1d5db",
  placeholderColor = "#9ca3af",     // quando usar o componente e não declarar as expecipicações ele vai ficar com essas config inicias
  borderRadius = 12,
  icon,
  iconPosition = "right",
  iconColor = "#6b7280",
  iconSize = 18,
  style,
  ...rest   //pega as coisas que sobrou
}: InputProps) {

  const inputPadding = icon // se o input tiver um icone aqui vamos declarar o espaçamennto dele
    ? iconPosition === "right"
      ? "0 40px 0 14px" // se tiver um icone à direita o padding terá essas configurações. 
      : "0 14px 0 40px" // se tiver um icone à esquerda o padding terá essas configurações.
      : "0 14px";      // se não tiver nenhum fica assim.

  return (
    <div
      style={{
        width,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        ...containerStyle,  // Permite personalizar o container.
      }}
    >
      {label && (
        <label
          style={{
            fontSize: 14,
            fontWeight: 600,        // caso declare o label essas são as config iniciais
            color: "#111827",     // se colocar label cria um Label e atribui a propriedade {label}-> texto do label
            ...labelStyle,
          }}
        >
          {label}
        </label>
      )}

      <div style={{ position: "relative", width: "100%", height }}>
        {icon && iconPosition === "left" && (
          <div
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: iconColor,
              fontSize: iconSize,
              pointerEvents: "none",
            }}
          >
            {icon}
          </div>
        )}

        <input
          {...rest}
          style={{
            width: "100%",
            height: "100%",
            padding: inputPadding,
            backgroundColor,
            border: `1px solid ${borderColor}`,
            borderRadius,
            color: "#111827",
            fontSize: 14,
            outline: "none",
            boxSizing: "border-box",
            transition: "border-color 0.2s ease, box-shadow 0.2s ease",
            ...style,
          }}
        />

        <style>{`
          input::placeholder {
            color: ${placeholderColor};
          }

          input:focus {
            border-color: ${borderColor};
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);
          }
        `}</style>

        {icon && iconPosition === "right" && (
          <div
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: iconColor,
              fontSize: iconSize,
              pointerEvents: "none",
            }}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;
