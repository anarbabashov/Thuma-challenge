export default function CloseButton({ onClick }) {
  return (
    <button onClick={onClick} style={{ border: 0, background: "transparent" }}>
      <span role="img" aria-label={`remove item link`}>
        ❌
      </span>
    </button>
  );
}
