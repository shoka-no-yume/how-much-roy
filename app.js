const app = Vue.createApp({
    data(){
        return {
            title: 'How much ROY',
            searchPhrase: '',
            roy_usd: this.getRoyPrice(),
            items: [
                {id: 1, name: "Grain of rice in India", priceUsd: 0.0000138},
                {id: 2, name: "Candy", priceUsd: 0.038},
                {id: 3, name: "Lego Brick 2x4 (Bright Red)", priceUsd: 0.25},
                {id: 4, name: "Water bottle", priceUsd: 0.5},
                {id: 5, name: "Chocolate bar", priceUsd: 1.0},
                {id: 6, name: "Push Pins (100-Pack)", priceUsd: 3.02},
                {id: 7, name: "Original Rubik's Cube", priceUsd: 10.99},
                {id: 8, name: "Raspberry Pi 4", priceUsd: 35},
                {id: 9, name: "Ledger Nano X", priceUsd: 119},
                {id: 10, name: "Double Bed", priceUsd: 350},
                {id: 11, name: "Apple Mac Pro Wheels Kit", priceUsd: 699},
                {id: 12, name: "OMEN 30L Gaming Desktop PC, NVIDIA GeForce RTX 3080, 10th Gen Intel Core i9-10850K Processor, 32 GB RAM, 1 TB SSD + 2 TB HDD, Windows 10 Home", priceUsd: 2729.99},
                {id: 13, name: "Lambo", priceUsd: 350000},
                {id: 14, name: "Private island", priceUsd: 3000000},
                {id: 15, name: "Most Expensive House in the US | 924 Bel Air Rd. California", priceUsd: 94000000},
                {id: 16, name: "Jeff Bezos Superyacht", priceUsd: 500000000},
                {id: 17, name: "One year studying at Harvard University (in total)", priceUsd: 80000},
                {id: 18, name: "Lionel Messi's weekly salary", priceUsd: 850829.10},
                {id: 19, name: "A new set of car tires", priceUsd: 555},
                {id: 20, name: "Bubble Tea", priceUsd: 4}
            ]
        }
    },
    computed:{
        itemsFiltered(){
            if(this.searchPhrase.length>0){
                return this.items.filter(i => i.name.toLowerCase().includes(this.searchPhrase.toLowerCase()));
            } else {
                return this.items;
            }
        }
    },
    methods:{
        async getRoyPrice(){
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=crypto-royale&vs_currencies=usd",requestOptions);
            const data = await response.json();
            const val = data['crypto-royale']['usd'];
            this.roy_usd = this.fixedRoy(val, 4);
            for(let i=0; i<this.items.length; i++){
                this.items[i].priceRoy = this.autoFixedRoy(this.items[i].priceUsd/this.roy_usd);
            }
            this.items.sort((a, b) => a.priceUsd - b.priceUsd);
        },
        fixedRoy(n, d){
            return (Math.round(n * 10000) / 10000).toFixed(d);
        },
        autoFixedRoy(n){
            if(n<1) return this.fixedRoy(n, 4)
            else if(n<100) return this.fixedRoy(n, 2)
            else return this.fixedRoy(n, 0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
    }
}).mount('#app')