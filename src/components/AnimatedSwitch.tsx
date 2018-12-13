import styled from 'styled-components'
import { AnimatedSwitch } from 'react-router-transition'

export default styled(AnimatedSwitch) `
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;

  > div {
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
`
