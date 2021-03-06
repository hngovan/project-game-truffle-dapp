import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/data/dataActions";
import { connect } from "../redux/blockchain/blockchainActions";
import * as s from "../styles/globalStyles";
import _bg from "../assets/images/bg/_bg.png";
import _center from "../assets/images/bg/center.png";
import _center1 from "../assets/images/bg/center1.png";
import _badge_1 from "../assets/images/bg/badge_1.gif";
import _badge_3 from "../assets/images/bg/badge_3.gif";
import _badge_4 from "../assets/images/bg/badge_4.gif";
import _m1 from "../assets/images/bg/m1.png";
import _m2 from "../assets/images/bg/m2.png";
import _m3 from "../assets/images/bg/m3.png";
import _m4 from "../assets/images/bg/m4.png";
import _m5 from "../assets/images/bg/m5.png";
import _m6 from "../assets/images/bg/m6.png";
import _m7 from "../assets/images/bg/m7.png";
import _m8 from "../assets/images/bg/m8.png";
import _m9 from "../assets/images/bg/m9.png";
import _m10 from "../assets/images/bg/m10.png";
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaFacebookSquare } from "react-icons/fa";

const Home = () => {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);

    const [products] = useState([_m1, _m2, _m3, _m4, _m5, _m6, _m7, _m8, _m9, _m10]);
    const [productIndex, setProductIndex] = useState(0);

    let firstFourProducts = products.slice(productIndex, productIndex + 5);

    const nextProduct = () => {
        const lastProductIndex = products.length - 1;
        const resetProductIndex = productIndex === lastProductIndex;
        const index = resetProductIndex ? 0 : productIndex + 1;
        setProductIndex(index);
    };
    const prevProduct = () => {
        const lastProductIndex = products.length - 1;
        const resetProductIndex = productIndex === 0;
        const index = resetProductIndex ? lastProductIndex : productIndex - 1;
        setProductIndex(index);
    };

    // update 
    useEffect(() => {
      if (blockchain.account !== "" && blockchain.truffleFactory !== null) {
        dispatch(fetchData(blockchain.account));
      }
    }, [blockchain.account, blockchain.truffleFactory, dispatch]);

    return (
    <>
        <s.Screen image={_bg}>
            <s.Container flex={1} ai={"center"} jc={"center"}>
                <s.BoxHome>
                    <s.TextTitleHome>CryptoTruffles.</s.TextTitleHome>
                    <s.TextTitleHome>Collectible.</s.TextTitleHome>
                    <s.TextTitleHome>Breedable.</s.TextTitleHome>
                    <s.TextTitleHome>Adorable.</s.TextTitleHome> 
                    <s.TextSubTitleHome>collect and breed furrever friends !</s.TextSubTitleHome>
                    <s.TextSubTitleHome>Total in game: {data.allTruffles.length}/1000</s.TextSubTitleHome>
                    <s.SpacerSmall />
                    <s.StyledButton 
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(connect());
                        }}
                    >
                        Start Collectible
                    </s.StyledButton>
                    <s.SpacerXSmall />
                    {blockchain.errorMsg !== "" ? (
                    <s.TextDescription>{blockchain.errorMsg}</s.TextDescription>
                    ) : null}

                </s.BoxHome>
            </s.Container>
        </s.Screen>

        <s.ContainerBoxHome test ai={"center"} style={{paddingTop: "4rem"}}>
            <s.Container ai={"center"}>
                <s.ContainerHomeBox fd={"row"} jc={"space-between"} ai={"center"}>
                    <s.BoxViewHome>
                        <s.ImageToggleRenderHome image={_badge_3}/>
                        <s.TextTitle>Current Holders</s.TextTitle>
                        <s.TextTitleHome>+126k</s.TextTitleHome>
                    </s.BoxViewHome>
                    <s.BoxViewHome>
                        <s.ImageToggleRenderHome image={_badge_1}/>
                        <s.TextTitle>CryptoTruffles</s.TextTitle>
                        <s.TextTitleHome>+2 million</s.TextTitleHome>
                    </s.BoxViewHome>
                    <s.BoxViewHome>
                        <s.ImageToggleRenderHome image={_badge_4}/>
                        <s.TextTitle>Total Volume</s.TextTitle>
                        <s.TextTitleHome>??67.060</s.TextTitleHome>
                    </s.BoxViewHome>
                </s.ContainerHomeBox>
            </s.Container>
 
            <s.ContainerBoxHomev2 fd={"row"}ai={"center"} jc={"space-between"} style={{marginTop: "7rem"}}>
                <s.TextBoxRight>
                    <s.TextTitleHomev2>What is CryptoTruffles ?</s.TextTitleHomev2>
                    <s.TextSubTitleHomev2>CryptoTruffle is a game centered around breedable, collectible, and oh-so-adorable creatures 
                        we call CryptoTruffles! Each truffle is one-of-a-kind and 100% owned by you; it cannot be replicated, taken away, or destroyed.
                    </s.TextSubTitleHomev2>
                    <s.StyledButtonv2 
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(connect());
                        }}
                    >
                        <NavLink to="/mytruffle" >
                            Buy Now
                        </NavLink>
                    </s.StyledButtonv2>
                </s.TextBoxRight>
                    <s.ImageToggleHomev2 image={_center}/>
            </s.ContainerBoxHomev2>

            <s.ContainerBoxHomev2 fd={"row"} ai={"center"} jc={"space-between"} style={{margin: "10rem 0"}}>
                <s.TextBoxRight>
                    <s.TextTitleHomev2>The Story</s.TextTitleHomev2>
                    <s.TextSubTitleHomev2>A group of friends went camping in the Magic Forest to see what secrets they could uncover. 
                        The glow of the full moon drew their attention to a field of colorful truffle under a canopy of trees. 
                        They ate the deliciously colored truffle and were instantly transported from the Magic Forest to a new realm, 
                        the biotic metaverse. The friends found the truffle held magical properties as they took a look at each other 
                        and realized their bodies had slowly morphed into truffle - thus creating the Magic Truffle Clubhouse. 
                        They now embark on adventures to spread the ancient powers of truffle, discover the secrets of their ancestors 
                        and help others along the way!
                    </s.TextSubTitleHomev2>
                </s.TextBoxRight>
                    <s.ImageToggleHomev3 image={_center1}/>
            </s.ContainerBoxHomev2>

            <s.ContainerBoxHomev2 fd={"row"} ai={"flex-end"} jc={"space-between"} style={{marginTop: "3rem"}}>
                <s.TextBoxRight>
                    <s.TextTitleHomev2>Featured Collection</s.TextTitleHomev2>
                    <s.TextSubTitleHomev2>The Magic Truffle Clubhouse is a collection of 2 million 
                        uniquely generated NFTs who were transported through the magic forest into the blockchain.
                    </s.TextSubTitleHomev2>
                </s.TextBoxRight>
                <s.TextBoxLeft>
                    <s.StyledButton 
                        onClick={prevProduct}
                        style={{marginRight: "1rem"}}
                    >
                        Prev
                    </s.StyledButton>
                    <s.StyledButton
                        onClick={nextProduct}
                    >
                        Next
                    </s.StyledButton>
                </s.TextBoxLeft>
            </s.ContainerBoxHomev2>


            <s.ContainerBoxHomev2 fd={"row"} ai={"center"} jc={"center"} style={{margin: "3rem 0 10rem 0"}}>
                   {firstFourProducts.map(item => 
                        (<s.ImageToggleRenderv2 image={item}/>)
                    )}     
            </s.ContainerBoxHomev2> 

            <s.ContainerBoxHomev3 ai={"center"}>
                <s.ContainerBoxHomev2 fd={"row"} ai={"center"} jc={"space-between"}>
                    <s.TextBoxRight>
                        <s.TextTitleHomev2>Join The Magic Truffle Clubhouse</s.TextTitleHomev2>
                        <s.TextSubTitleHomev2>Don't miss out on our limited collection of Magic Mushroom NFT's.</s.TextSubTitleHomev2>
                    </s.TextBoxRight>
                    <s.Container>
                        <NavLink1 
                            style={{marginBottom: "10px"}}
                            to={{ pathname: "https://www.facebook.com/mn.HoangEt" }} 
                            target="_blank"
                        >
                            <s.StyledButtonActionv2>
                                Contact Ho??ng <FaFacebookSquare style={{marginLeft: "15px"}}/>
                            </s.StyledButtonActionv2>
                        </NavLink1>
                        <NavLink1 
                            to={{ pathname: "https://www.facebook.com/haj.pham.313" }} 
                            target="_blank"
                        >
                            <s.StyledButtonActionv2>
                                Contact H???i<FaFacebookSquare style={{marginLeft: "15px"}}/>
                            </s.StyledButtonActionv2>
                        </NavLink1>
                    </s.Container>
                </s.ContainerBoxHomev2>
            </s.ContainerBoxHomev3>
        </s.ContainerBoxHome>                      
    </>
    )
}

export const NavLink = styled(Link)`
  color: #ffffff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1.5rem;
  cursor: pointer;

  &:hover {
    transition: all 0.2s ease-in-out;
    color: #000000;
  }

  @media screen and (max-width: 1600px) {
    padding: 0 0rem;
  }
`;

export const NavLink1 = styled(Link)`
  color: #ffffff;
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    transition: all 0.2s ease-in-out;
    color: #000000;
  }
`;

export default Home
