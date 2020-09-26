import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  getChannels(): Observable<any> {
    return this.afs.collection('channels').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, data };
        });
      })
    );
  }

  getChannelById(channelId: any): Observable<any> {
    return this.afs.collection('channels').doc(channelId).valueChanges();
  }

  getChannelMessages(channelId: any): Observable<any> {
    return this.afs.collection('channels').doc(channelId).collection('messages', (ref: firebase.firestore.CollectionReference) => ref
      .orderBy('timestamp', 'asc'))
      .valueChanges();
  }

  addChannel(channel: any): void {
    this.afs.collection('channels').add(channel).then();
  }
}
