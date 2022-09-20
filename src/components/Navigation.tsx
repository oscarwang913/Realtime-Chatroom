import { ReactNode } from "react"
import styled from "styled-components"

const StyledNav = styled.nav`
  border: 1px solid red;
  height: 30px;
  line-height: 30px;
`
interface Children {
  children: ReactNode
}

const Navigation = ({children}:Children) => {
  return (
    <StyledNav>
      {children}
    </StyledNav>
  )
}

export default Navigation