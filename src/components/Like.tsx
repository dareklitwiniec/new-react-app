import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useState } from 'react';

interface Props {
    onClick: () => void;
}

const Like = ({ onClick }: Props) => {

    const [status, setStatus] = useState(true);

    const toogle = () => {
        setStatus(!status);
        onClick();
    }

    if (status)
        return <AiFillHeart color='#ff6b81' size={40} onClick={toogle} />;
    return <AiOutlineHeart size={40} onClick={toogle} />


}

export default Like

