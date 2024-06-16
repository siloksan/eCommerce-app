interface Style {
  [key: string]: string;
}

interface Props {
  svgPath: string;
  alt: string;
  style?: Style;
}

function SvgComponent({ svgPath, alt, style }: Props) {
  return <img src={svgPath} alt={alt} style={style} />;
}

export default SvgComponent;
