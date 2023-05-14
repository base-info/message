type msg = string;
type Options = {
    text: string;
    duration?: number;
    style?: style;
    deviation?: number;
};
type style = {
    [key: string]: string | number;
};

export default function LLmessage(params: msg | Options) {
    let msg: string,
        time: number = 3000,
        style: style | undefined,
        dev: number = 30;
    if (typeof params === 'string') {
        msg = params;
    } else {
        msg = params.text;
        time = params.duration || 3000;
        style = params.style;
        dev = params.deviation || 30;
    }
    if (!msg) {
        return;
    }
    popupMsg(msg, time, dev, style);
}

function popupMsg(msg: string, time: number, dev: number, style?: style) {
    const _style: style = {
        padding: '5px 10px',
        'border-radius': '5px',
        background: '#ccc',
        color: '#fff',
        'max-width': '80%',
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%) translateY(-100%)',
        transition: 'all 100ms',
        'word-break': 'break-all',
        'font-size': '14px'
    };
    const box = document.createElement('div');
    box.innerText = msg;
    Object.assign(box.style, { ..._style, ...style });
    document.body.appendChild(box);
    setTimeout(() => {
        box.style.top = `${dev}px`;
    });
    setTimeout(() => {
        box.style.top = '0';
        let dur: number | string = box.style.transitionDuration;
        if (/ms$/.test(dur)) {
            dur = parseFloat(dur);
        } else {
            dur = parseFloat(dur) * 1000;
        }
        setTimeout(() => {
            document.body.removeChild(box);
        }, dur);
    }, time);
}
