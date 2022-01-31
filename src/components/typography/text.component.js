import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const body = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const hint = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const error = (theme) => `
    color: ${theme.colors.text.error};
`;

const caption = (theme) => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
`;

const label = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.medium};
`;

const labelTitle = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.title};
`;

const bodyInverse = (theme) => `
    color: ${theme.colors.text.inverse};
`;

const titleInverse = (theme) => `
    color: ${theme.colors.text.inverse};
    font-size: ${theme.fontSizes.title};
`;

const variants = {
  body,
  label,
  labelTitle,
  caption,
  error,
  hint,
  bodyInverse,
  titleInverse,
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
  variant: "body",
};
