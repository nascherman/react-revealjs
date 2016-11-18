const React = require('react');
const Reveal = require('reveal.js');

class ReactReveal extends React.Component {
  constructor(props) {
    Object.assign(props.reveal, {
       dependencies: [
        { src: '//cdnjs.cloudflare.com/ajax/libs/marked/0.3.6/marked.min.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
        { src: '///cdnjs.cloudflare.com/ajax/libs/reveal.js/3.3.0/plugin/markdown/markdown.min.js',  condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
        { src: '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.8.0/highlight.min.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } }
        
      ]
    })
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
        let  markdown = `
          <section data-markdown>
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
