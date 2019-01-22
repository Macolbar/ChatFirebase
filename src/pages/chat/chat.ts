import { AngularFirestore } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



/**
* Generated class for the ChatPage page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
//@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  username: string = '';
  message: string = '';
  _chatSubscription;
  messages: object[] = [];

  constructor(public db: AngularFirestore,
    public navCtrl: NavController, public navParams: NavParams) {
      this.username = this.navParams.get('username');
      this._chatSubscription = this.db.collection('/chat').add( data => { //subscribe
        this.messages = data;
      });
    }

    sendMessage() {
      this.db.collection('/chat').add({ //push
        username: this.username,
        message: this.message
      }).then( () => {
        // message is sent
      });
      this.message = '';
    }

    ionViewDidLoad() {
      this.db.list('/chat').push({
        specialMessage: true,
        message: `${this.username} has joined the room`
      });
    }

    ionViewWillLeave(){
      this._chatSubscription.unsubscribe();
      this.db.list('/chat').push({
        specialMessage: true,
        message: `${this.username} has left the room`
      });
    }
  }
