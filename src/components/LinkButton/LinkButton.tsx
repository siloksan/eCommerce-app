interface LinkButtonProps {
  text: string;
  link: string;
}

function LinkButton({ text, link }: LinkButtonProps) {
  return <a href={link}>{text}</a>;
}

export default LinkButton;
