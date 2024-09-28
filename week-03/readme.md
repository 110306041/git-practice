什麼是 AWS Region, AZ (availability zones)
---

#### Region
- AWS 作為雲端商，會在世界各大地區建立基礎設施，ex: 東京(Tokyo)。一個實體地區的概念對到 AWS 的架構中就是 Region。
- 使用者可選擇要在哪個 Region 運行你的應用，選擇 Region 後，所有的運算、儲存等操作都會在該地區內進行。
- 為了提高數據的安全性和應用的可靠性，每個 Region 都是完全獨立的。
- e.g. 如果一個地區發生地震或洪水，其他地區的數據中心不會受到影響，且地理上的接近性也可以減少數據傳輸時間，從而降低 latency，提高應用程序的 response rate。
- 一個 Region 會有多個 AZ
  
#### AZ (availability zones)
- Availability Zone 為 「邏輯資料中心」
- 每個 AZ 在物理上也是獨立的，具有自己的基礎設施和服務。但與 Region 不同的是，同一 Region 內的 AZ 之間透過 low-latency links 互相連接，提供 high availability 和 disaster recovery 的能力 。通過在不同的 AZ 部署應用的 replicas，即使一個 AZ 出現故障，其他 AZ 還是可以保持應用正常運行。
- 在某些服務中，使用者可選 AZ，是**使用者所能選的最小單位**。例如：特定服務像是 EC2 服務會詢問使用者要選放在哪一個 AZ。
- 一個 AZ 中會有多個 **data center** ，也就是機房，**實際放上主機與硬體設備**等的地方，是 AWS 基礎建設的最小單位，**使用者無法選要在哪一個 data center**。

#### 兩者之關聯
![This is an alt text.](https://www.cythilya.tw/assets/aws/architecting-on-aws-note-1/data_center_az_local_zone_region.png)
- 如上圖所示，一個 **Region** 上有多個 **AZ**，每個 AZ 裡又有多個 **data center**
- **Local Zone** 為**位於市中心的機房**，更貼近使用者實體距離的基礎設施。local zone 在市中心，可減少 latency。

#### 參考資料
[AWS VPC 網路架構 (觀念講解篇)](https://hackmd.io/@AWSlearning/BJvnmhRg2)
[Architecting on AWS 筆記：基礎設施](https://www.cythilya.tw/2022/04/28/architecting-on-aws-infrastructure/)

如果你要使用 AWS 服務，你會怎麼選擇用哪個 Region，考慮的因素有哪些？
---
#### 選擇 Region 之考量因素
- 法規、合規性 (governance)：資料無法分享到國外，就只能選自己國內的 resgion。
- 延遲 (latency)：離客戶愈近愈好，就要選離客戶近的 region。AWS 的服務無法不見得都支援世界各地 (service availability)，例如：新出的服務不會馬上上線到世界各地的 region，必須考量負載量、穩定性等。
- 成本 (cost)：EC2 VM 在各個 region 的計價是相同的，但不同 region 的牌價 (法規、稅) 可能是不同的，例如 $0.01/秒 vs $0.03/秒的差異。
