export const insuranceMap = {
    國泰: {
        '05	乙式車體損失險-自用': true,
        '09	車體險全損理賠無折舊': true,
        '0D	車體許可使用免追償': true,
        '31	第三人責任保險-傷害【自用】': true,
        '32	第三人責任保險-財損【自用】': true,
        '2A	第三人責任險附加慰問金費用': true,
        '49	第三人附加駕駛人傷害險': true,
        '5B	第三人附加乘客傷害責任險': true,
        '30	第三人超額附加條款-乙型': true,
        '3Q	律師費用補償附加條款': true,
        '0W	道路救援險附加條款': true,
        '48	強制駕駛人傷害(汽車單一事故)': true,
        '其他保險種類 (用戶輸入)': true,
    },
    新光: {
        'GA 綠能環保汽車保險': true,
        'GA05 綠能環保汽車保險-車體乙式': true,
        'GA1W 綠能環保汽車保險-限額天災': true,
        'GA11 綠能環保汽車保險-竊盜損失': true,
        'GA31 綠能環保汽車保險-第三人體傷': true,
        'GA32 綠能環保汽車保險-第三人財損': true,
        'GA50 綠能環保汽車保險-乘客責任': true,
        'GA77 綠能環保汽車保險-道路救援': true,
        '07 車體全損免折舊': true,
        '16 車體損失險附加代車費用險': true,
        '17 竊盜全損免折舊': true,
        '19 竊盜險附加代車費用險': true,
        '301 第三人超額乙式附加條款': true,
        '27B 慰問金費用保險-B型住院金': true,
        '3Y 第三人責任險-失能責任增額': true,
        '491 第三人責任附加駕駛人傷害險': true,
        '49C 駕駛人傷害險醫療-實支實付型': true,
        '3X 刑事訴訟律師費用保險': true,
        '48 強制附加駕駛人傷害保险': true,
        '其他保險種類 (用戶輸入)': true,
    },
    旺旺友聯: {
        '05 乙式車體損失險': true,
        '02 颱風洪水險': true,
        '88 車體全損免折舊': true,
        '11 竊盜損失保險': true,
        '15 零配件被竊損失險高額保障': true,
        '17 竊盜全損免折舊': true,
        '31 第三人責任保險-體傷': true,
        '32 第三人責任保險-財損': true,
        '33A 第三人責任傷害住院慰問費用': true,
        '33B 第三人責任傷害身故慰問費用': true,
        '34A1 第三人超額責任-不含受酒類影響': true,
        '39 第三人責任險刑事訴訟律師費用': true,
        '65 乘客體傷責任附加條款': true,
        '56 第三人責任附加駕駛人傷害保險': true,
        '57 第三人附加駕駛人傷害醫療給付': true,
        '其他保險種類 (用戶輸入)': true,
    },
    富邦: {
        '02 颱風、地震、洪水附加條款': true,
        '05 車體損失險乙式': true,
        '07 全損免折舊附加條款': true,
        '11 竊盜損失險': true,
        '17 竊盜損失險全損免折舊': true,
        '1B 零配件被竊高額保障附加條款': true,
        '27A1 慰問金保險-甲型': true,
        '30B 超額責任附加條款-乙式(每一期間)': true,
        '31 第三人責任險-傷害': true,
        '32 第三人責任險-財損': true,
        '38 刑事訴訟律師費用補償險': true,
        '50A 駕駛人傷害險': true,
        '51A 乘客體傷責任險': true,
        '21 強制汽車責任險': true,
        '其他保險種類 (用戶輸入)': true,
    },
};

export class InsuranceInfo {
    insuranceStartDate: Date = null;
    insuranceEndDate: Date = null;
    insuranceCompany: string = null;
    insurancePrice: number = null;
    insuranceType: string = null;
    insuranceOtherType: string = null;
}