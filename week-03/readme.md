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
- 每個 AZ 在物理上也是獨立的，但與 Region 不同的是，同一 Region 內的 AZ 之間透過 **low-latency links** 互相連接，提供 high availability 和 disaster recovery 的能力 。通過在不同的 AZ 部署應用的 replicas，即使一個 AZ 出現故障，其他 AZ 還是可以保持應用正常運行。
- AZ是**使用者所能選的最小單位**。例如：特定服務像是 EC2 服務會詢問使用者要選放在哪一個 AZ。
- 一個 AZ 中會有多個 **data center** ，也就是機房，**實際放上主機與硬體設備**等的地方，是 AWS 基礎建設的最小單位，**使用者無法選擇要在哪一個 data center**。

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
1. **Latency**：選擇靠近用戶的 Region 可以降低 latency，進而提高應用程序的 response rate。
- e.g. 如果此應用大多數用戶位於亞洲，選擇亞洲（東京、新加坡、孟買等）的 Region 會更合適。

2. **成本考量**：不同 Region 的定價可能有所不同，包括資料的運算、儲存和傳輸費用。
- e.g. 假設你正要開發一個串流平台，需要大量的儲存空間和頻寬，這些通常在不同的Region會有不同的價格。

3. **法規、合規性**：不同國家和地區對資料儲存和處理有不同的法規要求，  
- e.g. 歐盟的 GDPR (General Data Protection Regulation) 規定歐盟公民的個人數據必須在歐盟內處理和處理。所以如果應用涵蓋到歐盟市場，會需要選擇一個在歐盟內的 AWS Region。

4. **可用性**：不是所有 AWS 服務在每個 Region 都有提供。
- e.g. 如果你打算在澳洲市場推出電商平台，且預計會依賴 AWS Lambda 和 Amazon Aurora 服務。在選擇 Region 會前需要確認 Sidney（ap-southeast-2）Region 是否支持此兩種服務，以確保應用能夠正常運行。
