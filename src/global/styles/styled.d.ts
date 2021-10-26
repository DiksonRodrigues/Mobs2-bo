import 'styled-components';
import theme from './theme';

declare module 'styled-components'{
    type DefaultColors = typeof theme

    interface DefaultTheme extends DefaultColors {}
}