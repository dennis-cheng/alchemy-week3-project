import { Alchemy, Network, Utils } from "alchemy-sdk"
import { useEffect, useState, Fragment } from "react"

import "./App.css"

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
}

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings)

function App() {
  const [blockNumber, setBlockNumber] = useState()
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber())
    }

    getBlockNumber()
  })

  useEffect(() => {
    getTransactions()
  }, [blockNumber])

  const getTransactions = async () => {
    const block = await alchemy.core.getBlockWithTransactions(blockNumber)
    setTransactions(block.transactions)
  }

  return (
    <div>
      <div className="App">Block Number: {blockNumber}</div>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}
      >
        <div>Tx Hash</div>
        <div>Value</div>
        {transactions.map((t) => (
          <Fragment key={t.hash}>
            <div>{t.hash}</div>
            <div>{Utils.formatEther(t.value.toString())} ETH</div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default App
