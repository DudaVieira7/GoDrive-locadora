import type { CSSProperties, InputHTMLAttributes, ReactNode } from "react";  

type InputProps = InputHTMLAttributes<HTMLInputElement> & {  
  label?: string;
  labelStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;          
  borderColor?: string;
  placeholderColor?: string;
  borderRadius?: number;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  iconColor?: string;
  iconSize?: number;
  onIconClick?: () => void; // <--- Adicionado para permitir clicar no ícone
};

function Input({
  label,
  labelStyle,
  containerStyle,
  width = "100%",
  height = 48,
  backgroundColor = "#ffffff",
  borderColor = "#d1d5db",
  placeholderColor = "#9ca3af",     
  borderRadius = 12,
  icon,
  iconPosition = "right",
  iconColor = "#6b7280",
  iconSize = 18,
  style,
  onIconClick, // <--- Recebido aqui
  ...rest   
}: InputProps) {

  const inputPadding = icon 
    ? iconPosition === "right"
      ? "0 40px 0 14px" 
      : "0 14px 0 40px" 
      : "0 14px";      

  return (
    <div
      style={{
        width,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        ...containerStyle,  
      }}
    >
      {label && (
        <label
          style={{
            fontSize: 14,
            fontWeight: 600,        
            color: "#111827",     
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
            onClick={onIconClick} // <--- Ativa a função ao clicar
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
              cursor: onIconClick ? "pointer" : "default", 
              pointerEvents: "auto", 
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