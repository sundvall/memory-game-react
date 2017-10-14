import React from 'react';
import heightFromAspectRatio from './aspectRatio.js';
import backOfCardImg from '../img/back_of_card.png';
import logoImg from '../img/logo.png';

function styleFg(h) {
    const b = 6;
    const hpx = `${h - b}px`;
    return {
        backgroundImage: `url(${backOfCardImg})`,
        height: hpx,
    };
}
function styleBg(h) {
    const b = 6;
    const hpx = `${h - b}px`;
    return {
        backgroundColor: `yellow`,
        height: hpx,
    };
}
function styleCard(h) {
    const m = Math.round(0.1 * h);
    const mpx = `${m}px`;
    const hpx = `${h}px`;
    // margin top left bottom right
    return {
        marginTop: mpx,
        marginBottom: mpx,
        height: hpx,
    };
}

const ResetWrap = () => (
    <div className="reset_wrap">
        <button className="reset" />
    </div>
);
const LogoWrap = () => (
    <div className="logo_wrap">
        <img className="logo" src={logoImg} alt="lgo" />
    </div>
);
const ScoreWrap = () => (
    <div className="score_wrap">
        <div className="score">10</div>
    </div>
);
const InfoWrap = () => (
    <div className="info_wrap">
        <ScoreWrap />
        <ResetWrap />
    </div>
);
const Confirm = () => (
    <div className="confirm_wrap confirm_hide" style={{'display':'block'}}>
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
    rescale(onceH, onceW) {
        const w = this.card ? this.card.getBoundingClientRect().width : 40;
        console.log('rescale: w ', w);
        const imageH = onceH || this.state.cardheight;
        const imageW = onceW || this.state.cardwidth;
        const cardscaledheight = heightFromAspectRatio(w, imageH, imageW);
        this.setState({ cardscaledheight });
    }
    handleResize(/* event */) {
        this.rescale();
    }
    handleImageLoaded({ target: img }) {
        console.log('handleImageLoaded');
        const cardheight = img.offsetHeight;
        const cardwidth = img.offsetWidth;
        this.setState({ cardheight, cardwidth });
        this.rescale(cardheight, cardwidth);
        window.addEventListener('resize', this.handleResize);
    }
    render() {
        const { cardscaledheight } = this.state;
        const { cards, cols, confirmreset } = this.props;
        const h = cardscaledheight;
        const w = 100/(parseInt(cols,10));
        const boardRef = elm => {
            this.board = elm;
        };
        const cardRef = elm => {
            this.card = elm;
        };
        const cardHeight = `${h}px`;
        const wperc = `${w}%`;
        console.log('Board:102:cardHeight', cardHeight);
        return (
            <div ref={boardRef} id="memorygame">
                <div className="board">
                    <LogoWrap />
                    <ul className="board_items">
                        {!cardscaledheight && (
                            <img
                                src={backOfCardImg}
                                alt="testimage"
                                onLoad={this.handleImageLoaded}
                            />
                        )}
                        <div />
                        {cards.map(card => (
                            <li
                                className="board_item"
                                row="i"
                                col="j"
                                key={card.id}
                                style={{"width":wperc}}
                            >
                                <div className="board_item_content persp">
                                    <div
                                        ref={cardRef}
                                        className="card pres3d"
                                        style={styleCard(h)}
                                    >
                                        <div
                                            className="card_fg backhidden pres3d rot0"
                                            style={styleFg(h)}
                                        />
                                        <div
                                            className="card_bg backhidden pres3d rot180"
                                            style={styleBg(h)}
                                        />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <InfoWrap />

                    {confirmreset && <Confirm />}
                </div>
            </div>
        );
    }
}

export default Board;
