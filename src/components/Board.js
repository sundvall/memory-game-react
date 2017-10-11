import React from 'react';
import heightFromAspectRatio from './aspectRatio.js';
import backOfCardImg from '../img/back_of_card.png';

const BoardItemAndCard = ({ i, j }) => (
    <li className="board_item" row={i} col={j}>
        <div className="board_item_content persp">board_item</div>
    </li>
);
const ResetWrap = () => (
    <div className="reset_wrap">
        <button className="reset">RESET BTN</button>
    </div>
);
const ScoreWrap = () => (
    <div className="score_wrap">
        <div className="score">score</div>
    </div>
);
const InfoWrap = () => (
    <div className="info_wrap">
        infowrap<ScoreWrap />
        <ResetWrap />
    </div>
);
const Confirm = () => (
    <div className="confirm_wrap confirm_hide">
        <div className="confirm_box">
            <p className="confirm_text">Reset game?</p>
            <button className="confirm_accept">yes</button>
            <button className="confirm_cancel">no</button>
        </div>
    </div>
);

// function confirmSize () {
//      sätter storlek på modalen.
//     var parentHeight = elements.parent.getBoundingClientRect().height;
//     elements.confirmWrap.style.height = 1.2 * parentHeight + 'px';
//     elements.confirmBox.style.top = 0.5 * parentHeight + 'px';
// }
//

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cardheight: '', cardwidth: '', cardscaledheight: '' };
        this.handleImageLoaded = this.handleImageLoaded.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.rescale = this.rescale.bind(this);
    }
    rescale(onceH,onceW){
        const w = this.board.getBoundingClientRect().width;
        const imageH = onceH ||this.state.cardheight;
        const imageW = onceW ||this.state.cardwidth;
        const cardscaledheight = heightFromAspectRatio(
            w,
            imageH,
            imageW,
        );
        this.setState({ cardscaledheight });
    }
    handleResize(/* event */) {
        this.rescale();
    }
    handleImageLoaded({ target: img }) {
        const cardheight = img.offsetHeight;
        const cardwidth = img.offsetWidth;
        this.setState({ cardheight, cardwidth });
        this.rescale(cardheight,cardwidth);
        window.addEventListener('resize', this.handleResize);
    }
    render() {
        const { cardscaledheight } = this.state;
        const h = cardscaledheight / 6;
        const boardRef = elm => {
            this.board = elm;
        };
        const cardHeight = `${h}px`;
        // console.log('board:cardheight:', cardHeight);
        return (
            <div ref={boardRef} id="memorygame" className="board">
                <ul className="board_items">
                    {cardscaledheight && (
                        <img
                            src={backOfCardImg}
                            alt="testimage"
                            style={{ height: cardHeight }}
                        />
                    )}
                    {!cardscaledheight && (
                        <img
                            src={backOfCardImg}
                            alt="testimage"
                            onLoad={this.handleImageLoaded}
                        />
                    )}
                    <div />
                    <BoardItemAndCard i="0" j="1" />
                </ul>
                <InfoWrap />
                <Confirm />
            </div>
        );
    }
}

export default Board;
