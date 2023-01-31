import { PureComponent } from "react";
import parse from "html-react-parser";

class ParsedHtml extends PureComponent {
    render(){
        return parse(this.props.html);
    }
}

export default ParsedHtml;