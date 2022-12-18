const { createApp } = Vue;

createApp({
    data(){
        return{
            DateTime : luxon.DateTime,
            lastDates : [],
            messageIndex: '',
            contactToSearch : '',
            messageToSend : '',
            currentChatProfileID : 0,
            activeProfile : {
                name: 'Sofia',
                avatar: '_io'
            },
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: '_7',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: '_8',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                },
            ],
            contactsFound : []
        }
    },

    methods : {
        /**
         * this function check if the param is a string.
         * if is true then return just the parseInt (10) of the string from
         * index[1] to index[index.length - 1].
         * Doesn't convert the '_' in the string.
         * 
         * Meant to openChat, pass the 'avatar' key instead of a number
         * 
         * @param {*} index to check
         * @returns an integer
         */
        checkIndex(index){
            return (typeof index === typeof '') ? parseInt(index.substr(1, index.length-1),10) - 1 : index;
        },
        /** 
         * reset the messageClicked object
        */
        resetMessageClicked(){
            this.messageIndex = '';
        },
        /**
         * open the chat at index.
         * Must be the 'avatar' key or the index for 'contacts'.
         * 
         * index sarà una stringa quando si clicca su una chat in lista
         * e si usa la key avatar in quanto è univoca e contiene il suo uid
         * dopo il primo carattere '_'
         * 
         * @param {*} index of the chat to open
         */
        openChat(index){
            this.currentChatProfileID = this.checkIndex(index, 1);;
            this.resetMessageClicked();
        },
        /**
         * check in contact if there is a name who includes the string typed.
         * 
         * es.
         * writing 's' get 'Alessandro' and 'Sandro' too even if the 's' is 
         * Lower Case
         */
        checkUsersIncludes(){
            if(this.contactToSearch !== '' || this.contactToSearch == undefined){
                this.contactsFound = this.contacts.filter((contact)=>{
                    return  contact.name.includes(this.contactToSearch) || 
                            contact.name.includes(this.contactToSearch.charAt(0).toUpperCase() + this.contactToSearch.substr(1, this.contactToSearch.length - 1));
                });
            }
            else{
                this.contactsFound = this.contacts;
            }
        },
        /**
         * check in contact if there is a name which is equal to the string typed.
         * 
         * es.
         * writing 's' don't get 'Alessandro' but get 'Sandro'
         */
        checkUsers(){
            // if(this.contactToSearch !== '' || this.contactToSearch == undefined){
                this.contactsFound = this.contacts.filter((contact)=>{
                    return contact.name.includes(this.contactToSearch.trim().charAt(0).toUpperCase() + this.contactToSearch.trim().substr(1, this.contactToSearch.trim().length - 1));
                });
            // }
            // else{
            //     this.contactsFound = this.contacts;
            // }
        },
        /**
         * get a reply to send to the user.
         * The reply has a minimum of word of 1 and a maximum of 15
         */
        getFeedback(){
            this.contacts[this.currentChatProfileID].messages.push({
                date: this.setDateTime(),
                message: this.getReply(Math.floor(Math.random() * (15 + 1))),
                status: 'received'
            });
            this.contactsFound = this.contacts;
            this.getLastSent();
            this.checkUsers();
            // this.mapContactsFound();
        },
        getReply(nWords){
            let sentence = '';
            for (let i = 0; i < nWords; i++) {
                sentence += parole[Math.floor(Math.random() *  (parole.length -1 + 1))] + ' ';
            }
            return sentence;
        },
        /**
         * send the user message and call a reply after 1 second with getFeedback
         */
        sendMessage(){
            if(this.messageToSend.trim() !== ''){

                this.contacts[this.currentChatProfileID].messages.push({
                    date: this.setDateTime(),
                    message: this.messageToSend.trim(),
                    status: 'sent'
                });
                setTimeout(this.getFeedback ,1000);
            }
            this.messageToSend = '';
        },
        /**
         * is a toggle to open/close a message settings
         * 
         * @param {*} indexChat the chat index related to the message
         * @param {*} indexMessage the message related to the settings
         */
        toggleMessageSettings(indexMessage){
            this.messageIndex = (indexMessage !== this.messageIndex) ? indexMessage : ''
        },
        /**
         * delete the message selected by the settings
         */
        deleteMessage(){
            //meglio destrutturare o spiegare meglio
            this.contacts[this.currentChatProfileID].messages.splice(this.messageIndex, 1);
            // this.resetMessageClicked();
            this.contactsFound = this.contacts;
        },
        /**
         * get a string with date or time based on a provided preset
         * 
         * @param {*} date the datetime string
         * @param {*} index 0 => date; 1 => time
         * @param {*} dateTimePreset the preset to convert the date to locale string
         * @returns a string date/time converted
         */
        getDateTime(date, index, dateTimePreset){
            return this.DateTime.fromISO(date.split(' ')[index]).toLocaleString(dateTimePreset);
        },
        /**
         * 
         * @returns a string width a full datetime of now
         */
        setDateTime(){
            const now = this.DateTime.now().toLocaleString(this.DateTime.DATETIME_SHORT_WITH_SECONDS).split(', ');
            return `${now[0]} ${now[1]}`;
        },
        getLastSent(){
            this.lastDates = this.contacts.map(contact => {
                return contact.messages[contact.messages.length -1].date;
            });
        }
    },
    created(){
        //adding the key lastDate to every chat in list for the date of last message sent
        // this.mapContactsFound();
        this.contactsFound = this.contacts;
        this.getLastSent();

        this.openChat(this.currentChatProfileID);
    }
}).mount('#app');