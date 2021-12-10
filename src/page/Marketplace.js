import React, { useState, useEffect} from 'react';
import * as s from "../styles/globalStyles";
import _bg from "../assets/images/bg/_bg.png"
import { useDispatch, useSelector } from "react-redux";
import { fetchData} from "../redux/data/dataActions";
import RenderSell from '../componets/RenderSell';
import Pagination from "../componets/Pagination";
import { useHistory } from "react-router-dom";

const Marketplace = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data);
    const blockchain = useSelector((state) => state.blockchain);

    const [toggleState, setToggleState] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    let history = useHistory();
    //toggleTab
    const toggleTab = (index) => {
      setToggleState(index);
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumberLimit] = useState(10);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    const indexOfLastItem = currentPage * pageNumberLimit;
    const indexOfFirstItem = indexOfLastItem - pageNumberLimit;
    const currentItemsSell = data.allTruffles.filter(item => item.sell > 0).slice(indexOfFirstItem, indexOfLastItem);
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber); 

    const handleNextbtn = () => {
      setCurrentPage(currentPage + 1);
      if(currentPage + 1 > maxPageNumberLimit) {
        setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      }
    }

    const handlePrevbtn = () => {
      setCurrentPage(currentPage - 1);
      if((currentPage - 1) % pageNumberLimit === 0) {
        setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }
    }

    //{state sell my truffle}
    const [currentPage1, setCurrentPage1] = useState(1);
    const [pageNumberLimit1] = useState(10);
    const [maxPageNumberLimit1, setmaxPageNumberLimit1] = useState(5);
    const [minPageNumberLimit1, setminPageNumberLimit1] = useState(0);

    const indexOfLastItem1 = currentPage1 * pageNumberLimit1;
    const indexOfFirstItem1 = indexOfLastItem1 - pageNumberLimit1;
    const currentItemsMySell1 = data.allOwnerTruffles.filter(item => item.sell > 0).slice(indexOfFirstItem1, indexOfLastItem1);

    const paginate1 = (pageNumber) => setCurrentPage1(pageNumber); 

    const handleNextbtn1 = () => {
      setCurrentPage1(currentPage1 + 1);
      if(currentPage1 + 1 > maxPageNumberLimit1) {
        setmaxPageNumberLimit1(maxPageNumberLimit1 + pageNumberLimit1);
        setminPageNumberLimit1(minPageNumberLimit1 + pageNumberLimit1);
      }
    }

    const handlePrevbtn1 = () => {
      setCurrentPage1(currentPage1 - 1);
      if((currentPage1 - 1) % pageNumberLimit1 === 0) {
        setmaxPageNumberLimit1(maxPageNumberLimit1 - pageNumberLimit1);
        setminPageNumberLimit1(minPageNumberLimit1 - pageNumberLimit1);
      }
    }
    // {state price}
    const [currentPage2, setCurrentPage2] = useState(1);
    const [pageNumberLimit2] = useState(10);
    const [maxPageNumberLimit2, setmaxPageNumberLimit2] = useState(5);
    const [minPageNumberLimit2, setminPageNumberLimit2] = useState(0);

    const indexOfLastItem2 = currentPage2 * pageNumberLimit2;
    const indexOfFirstItem2 = indexOfLastItem2 - pageNumberLimit2;

    const paginate2 = (pageNumber) => setCurrentPage2(pageNumber); 

    const handleNextbtn2 = () => {
      setCurrentPage2(currentPage2 + 1);
      if(currentPage2 + 1 > maxPageNumberLimit2) {
        setmaxPageNumberLimit2(maxPageNumberLimit2 + pageNumberLimit2);
        setminPageNumberLimit2(minPageNumberLimit2 + pageNumberLimit2);
      }
    }

    const handlePrevbtn2 = () => {
      setCurrentPage2(currentPage2 - 1);
      if((currentPage2 - 1) % pageNumberLimit2 === 0) {
        setmaxPageNumberLimit1(maxPageNumberLimit2 - pageNumberLimit2);
        setminPageNumberLimit1(minPageNumberLimit2 - pageNumberLimit2);
      }
    }

    
    function fromNow(date, nowDate = Date.now(), rft = new Intl.RelativeTimeFormat('en', { numeric: "auto" })) {
      const SECOND = 1000;
      const MINUTE = 60 * SECOND;
      const HOUR = 60 * MINUTE;
      const DAY = 24 * HOUR;
      const WEEK = 7 * DAY;
      const MONTH = 30 * DAY;
      const YEAR = 365 * DAY;
      const intervals = [
          { ge: YEAR, divisor: YEAR, unit: 'year' },
          { ge: MONTH, divisor: MONTH, unit: 'month' },
          { ge: WEEK, divisor: WEEK, unit: 'week' },
          { ge: DAY, divisor: DAY, unit: 'day' },
          { ge: HOUR, divisor: HOUR, unit: 'hour' },
          { ge: MINUTE, divisor: MINUTE, unit: 'minute' },
          { ge: 30 * SECOND, divisor: SECOND, unit: 'seconds' },
          { ge: 0, divisor: 1, text: 'just now' },
      ];
      const now = typeof nowDate === 'object' ? nowDate.getTime() : new Date(nowDate).getTime();
      const diff = now - (typeof date === 'object' ? date : new Date(date)).getTime();
      const diffAbs = Math.abs(diff);
      for (const interval of intervals) {
          if (diffAbs >= interval.ge) {
              const x = Math.round(Math.abs(diff) / interval.divisor);
              const isFuture = diff < 0;
              return interval.unit ? rft.format(isFuture ? x : -x, interval.unit) : interval.text;
          }
      }
    }

    const [priceList, setPriceList] = useState(data.allTruffles.filter(item => item.sell > 0));
    //price list
    const sortByPrice = () => {
      const sorted = priceList.sort((a, b) => {
        return b.sell - a.sell;
      });
      setPriceList(sorted);
    };

    //sort
    useEffect(() => {
      sortByPrice()
    },)

    //search
    const handleChange = (e) => {
      setSearchTerm(e.target.value)
    }

    //find search id
    useEffect(() => {
      const results = data.allTruffles.filter(item =>
          item.id.includes(searchTerm)
      );
      setSearchResults(results);
    }, [data.allTruffles, searchTerm])

    //update account
    useEffect(() => {
      if (blockchain.account !== "" && blockchain.truffleFactory !== null) {
        dispatch(fetchData(blockchain.account));
      }
    }, [blockchain.account, blockchain.truffleFactory, dispatch]);

    return (
        <s.Screen image={_bg}>
            <s.Container flex={1} ai={"center"} jc={"flex-start"} style={{paddingTop: "3rem", marginTop: "4.5rem"}}>
                <s.ContainerTabBar>
                  <s.MenuTabsHome>
                    <s.TabHome
                      className={toggleState === 1 ? "active-tab" : null}
                      onClick={() => toggleTab(1)}
                    >
                      All {toggleState === 1 ? '(' + data.allTruffles.filter(item => item.sell > 0).length + ')' : null}
                    </s.TabHome>
                    <s.TabHome
                      className={toggleState === 2 ? "active-tab" : null}
                      onClick={() => toggleTab(2)}
                    >
                      My Items {toggleState === 2 ? '(' + data.allOwnerTruffles.filter(item => item.sell > 0).length + ')' : null}
                    </s.TabHome>
                    <s.TabHome
                      className={toggleState === 3 ? "active-tab" : null}
                      onClick={() => toggleTab(3)}
                    >
                      Price {toggleState === 3 ? '(' + data.allTruffles.filter(item => item.sell > 0).length  + ')' : null}
                    </s.TabHome>
                    <s.TabHome
                      className={toggleState === 4 ? "active-tab" : null}
                      onClick={() => toggleTab(4)}
                    >
                      Activity {toggleState === 4 ? '(' + data.allTruffles.filter(item => item.sell > 0).length  + ')' : null}
                    </s.TabHome>
                  </s.MenuTabsHome>
                    <s.InputSearch 
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleChange}
                    />
                </s.ContainerTabBar>
                {/* toggle 1 */}
                {toggleState === 1 ? (
                  <s.ContainerHome jc={"center"} ai={"center"} style={{flexWrap: "wrap", margin: "27px "}}>
                    {data.allTruffles.filter(item => item.sell > 0).length === 0 ? (
                      <s.Container flex={1} ai={"center"} jc={"center"}>
                        <s.TextTitle>
                          We can't find the items on sale.
                        </s.TextTitle>
                        <s.TextSubTitleHome>
                          try reloading the page !
                        </s.TextSubTitleHome>
                        <s.SpacerSmall />
                      </s.Container>
                    ) : (
                      <>
                        <Pagination 
                          pageNumberLimit={pageNumberLimit} 
                          totalItems={data.allTruffles.filter(item => item.sell > 0).length} 
                          paginate={paginate} currentPage={currentPage} 
                          handleNextbtn={handleNextbtn}
                          handlePrevbtn={handlePrevbtn}
                          maxPageNumberLimit={maxPageNumberLimit}
                          minPageNumberLimit={minPageNumberLimit}
                        />
                        {searchResults != null ? (
                          <RenderSell data={searchResults} blockchain={blockchain}/>
                        ):(
                          <RenderSell data={currentItemsSell} blockchain={blockchain}/>
                        )}
                      </>
                    )}
                  </s.ContainerHome> 
                ) : (null)}
                {/* toggle 2 */}
                {toggleState === 2 ? (
                  <s.ContainerHome jc={"center"} ai={"center"} style={{flexWrap: "wrap", margin: "27px "}}>
                    {data.allOwnerTruffles.filter(item => item.sell > 0).length === 0 ? (
                      <s.Container flex={1} ai={"center"} jc={"center"}>
                        <s.TextTitle>
                          We can't find the items on sale.
                        </s.TextTitle>
                        <s.TextSubTitleHome>
                          try reloading the page !
                        </s.TextSubTitleHome>
                        <s.SpacerSmall />
                      </s.Container>
                    ) : (
                      <>
                        <Pagination 
                          pageNumberLimit={pageNumberLimit1} 
                          totalItems={data.allOwnerTruffles.filter(item => item.sell > 0).length} 
                          paginate={paginate1} currentPage={currentPage1} 
                          handleNextbtn={handleNextbtn1}
                          handlePrevbtn={handlePrevbtn1}
                          maxPageNumberLimit={maxPageNumberLimit1}
                          minPageNumberLimit={minPageNumberLimit1}
                        />
                        <RenderSell data={currentItemsMySell1} blockchain={blockchain}/>
                      </>
                    )}
                  </s.ContainerHome> 
                ) : (null)}
                {/* toggle 3 */}
                {toggleState === 3 ? (
                  <s.ContainerHome jc={"center"} ai={"center"} style={{flexWrap: "wrap", margin: "27px "}}>
                    {data.allTruffles.filter(item => item.sell > 0).length === 0 ? (
                      <s.Container flex={1} ai={"center"} jc={"center"}>
                        <s.TextTitle>
                          We can't find the items on sale.
                        </s.TextTitle>
                        <s.TextSubTitleHome>
                          try reloading the page !
                        </s.TextSubTitleHome>
                        <s.SpacerSmall />
                      </s.Container>
                    ) : (
                      <>
                        <Pagination 
                          pageNumberLimit={pageNumberLimit2} 
                          totalItems={priceList.length} 
                          paginate={paginate2} currentPage={currentPage2} 
                          handleNextbtn={handleNextbtn2}
                          handlePrevbtn={handlePrevbtn2}
                          maxPageNumberLimit={maxPageNumberLimit2}
                          minPageNumberLimit={minPageNumberLimit2}
                        />
                        {searchResults != null ? (
                          <RenderSell data={searchResults} blockchain={blockchain}/>
                        ):(
                          <RenderSell data={priceList.slice(indexOfFirstItem2, indexOfLastItem2)} blockchain={blockchain}/>
                        )}
                      </>
                    )}
                  </s.ContainerHome> 
                ) : (null)}
                {/* toggle 4 */}
                {toggleState === 4 ? (
                  <s.ContainerHome jc={"center"} ai={"center"} style={{flexWrap: "wrap", margin: "27px "}}>
                    {data.allTruffles.length === 0 ? (
                      <s.Container flex={1} ai={"center"} jc={"center"}>
                        <s.TextTitle>                        
                            There are currently no tokens for sale on the market
                        </s.TextTitle>
                        <s.TextSubTitleHome>
                            try reloading the page !
                        </s.TextSubTitleHome>
                        <s.SpacerSmall />
                      </s.Container>
                    ) : (
                    <s.Container jc={"center"} ai={"center"} >
                      <s.StyledTable>
                        <s.StyledTableContent>
                          <s.TextTableName>Item</s.TextTableName>
                          <s.TextTableName>Price</s.TextTableName>
                          <s.TextTableName>Current Owner</s.TextTableName>
                          <s.TextTableName>Previous Owner</s.TextTableName>
                          <s.TextTableName>Time</s.TextTableName>
                        </s.StyledTableContent>
                        {searchResults != null ? (
                        <>  
                         {searchResults.filter(item => item.sell > 0).map((item) => {
                          return (
                            <s.StyledTableRow key={item.id} onClick={() => history.push(`/details/${item.id}`)}> 
                                <s.TextTableEvent>{item.id}</s.TextTableEvent>
                                <s.TextTableEvent>{blockchain.web3.utils.fromWei(item.sell, "ether")} ETH</s.TextTableEvent>
                                <s.TextTableEvent>{item.currentOwner.substring(0, 6)}...{item.currentOwner.substring(item.currentOwner.length - 4)}</s.TextTableEvent>
                                <s.TextTableEvent>{item.previousOwner.substring(0, 6)}...{item.previousOwner.substring(item.previousOwner.length - 4)}</s.TextTableEvent>
                                <s.TextTableEvent>{fromNow(item.sellTime * 1000)}</s.TextTableEvent>
                            </s.StyledTableRow>
                          )
                        })}
                        </>
                        ) : (
                        <>
                        {data.allTruffles.filter(item => item.sell > 0).map((item) => {
                          return (
                            <s.StyledTableRow key={item.id} onClick={() => history.push(`/details/${item.id}`)}> 
                              <s.TextTableEvent>{item.id}</s.TextTableEvent>
                              <s.TextTableEvent>{blockchain.web3.utils.fromWei(item.sell, "ether")} ETH</s.TextTableEvent>
                              <s.TextTableEvent>{item.currentOwner.substring(0, 6)}...{item.currentOwner.substring(item.currentOwner.length - 4)}</s.TextTableEvent>
                              <s.TextTableEvent>{item.previousOwner.substring(0, 6)}...{item.previousOwner.substring(item.previousOwner.length - 4)}</s.TextTableEvent>
                              <s.TextTableEvent>{fromNow(item.sellTime * 1000)}</s.TextTableEvent>
                            </s.StyledTableRow>
                          )
                        })}
                        </>
                        )}
                      </s.StyledTable>
                    </s.Container>
                    )}
                  </s.ContainerHome> 
                ) : (null)}
            </s.Container>
        </s.Screen>
    )
}

export default Marketplace
