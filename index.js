const React = require('react');
const Reveal = require('reveal.js');

class ReactReveal extends React.Component {
  constructor(props) {
    super(props)
    if(!this.props.sections) {
      throw new Error('Need to include sections!', 
       `Usage: new ReactReaveal({
          sections: [
            {
              name: "..."
              markdown: "...or"
              markup: "..."
            }
          ]
        })`)
    }
    else if (!this.props.reveal) {
      throw new Error('Need a reveal config', 
      `Usage: new ReactReveal({
        ...
        reveal{
          controls: true,
          progress: true...
        }
       })`)
    }
  }

  componentDidMount() {
    Reveal.initialize(this.props.reveal);
  }

  render() {
    let jsx = '';
    this.props.sections.forEach((section, i) => {
      if(section.markdown) {
        let dataSeparator = section.dataSeparator 
        ? `data-separator="${section.dataSeparator}"`: null;
        let dataSeparatorVertical = section.dataSeparatorVertical 
        ? `data-separator-vertical="${section.dataSeparatorVertical}"` : null;
        let dataSeparatorNotes = section.dataSeparatorNotes 
        ? `data-separator-notes="${section.dataSeparatorNotes}"` : null;
        let  markdown = `
          <section data-markdown ${dataSeparator} ${dataSeparatorVertical} ${dataSeparatorNotes}>
            <script type="text/template">
              ${section.markdown}
            </script>
          </section>
        `;
        jsx += markdown;
      }
      else if(section.markup) {
        jsx += section.markup;
      }
      else {
        throw new Error('invalid section properties (need markup or markdown for each section)');
      }
    })
    return(
      <div className='reveal'>
        <div className='slides' dangerouslySetInnerHTML={{__html: jsx}}>
        </div>
      </div>
    );
  }
}

ReactReveal.propTypes = {
  name: React.PropTypes.string,
  sections: React.PropTypes.array
}

ReactReveal.defaultProps = {
  name: "Reveal",
  sections: []
}

export default ReactReveal;
