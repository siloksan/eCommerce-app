interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  return <button type="button">{text}</button>;
}
