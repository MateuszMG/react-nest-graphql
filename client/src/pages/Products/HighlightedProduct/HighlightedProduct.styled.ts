import styled, { css } from 'styled-components';

export const Wrapper = styled.div``;

export const SectionTitle = styled.h3``;

export const Section = styled.section(
  ({ theme: { colors } }) => css`
    border-bottom: 2px solid ${colors.primary};
    display: flex;
    padding: 24px 12px;
    margin: 12px;
  `,
);

export const Img = styled.img`
  height: 100px;
  margin-right: 20px;
  width: 100px;
`;

export const DataWrapper = styled.div`
  flex: 1;
`;

export const ProductTitle = styled.h2``;

export const Text = styled.p``;
