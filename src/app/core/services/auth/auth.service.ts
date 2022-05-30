import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { collection, doc, docData, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from '@firebase/auth';
import { setDoc, updateDoc } from '@firebase/firestore';
import { first, from, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth, // serviços de firebase authentication
    private db: Firestore, // serviços de banco firestorage do firebase
    private router: Router // mudar de rota de forma imperativa
    ) {}

    usuarios = collection(this.db, 'usuarios')

    uid?: string; // guarda o id único do usuário logado

    get logged(){
      return authState(this.auth).pipe(
        tap((user) => {
          this.uid = user?.uid;
        })
      );
    }

    get userDate(){
      const userDoc = doc(this.usuarios, this.uid);
      return docData(userDoc).pipe(first());
    }

    signupEmail(email:string, password:string, nome:string, nick:string){
      //se comunica com o auth e cria um usuário a partir do emial e senha
      // pode ocorrer erros por isso é importante retornar o observable
      //para monitorar o ocorrido
      return from(createUserWithEmailAndPassword(this.auth, email, password)
      ).pipe(
        tap((creds) =>{
          // cadastro de certo
          const user = creds.user; // informações do usuário logado
          const userDoc = doc(this.usuarios, user.uid);// referencia um documento de usuário no firebase
          // seta os dados do objeto dentro do documento com o mesmo id do usuário cadastrado
          setDoc(userDoc, {
            uid:user.uid,
            email: email,
            nome: nome,
            nick: nick,
          });

          this.emailVerificacao(creds.user);
        })
      )
    }


    loginEmail(email: string, password: string){
      //realiza o login com base no email/senha
      // o return é nescessário para o componente de login
      // usar subscribe e "saber" quando o login falhou
      return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
        tap((creds) => {
          this.emailVerificacao(creds.user);
        })
      );
    }

    logout(rota: '/login' | '/confirmar-email'){
      //desloga o usuário e ao final
      //navega para uma rota determinada
      return from (this.auth.signOut()).pipe(
        tap(() => {
          this.router.navigate([rota]);// redireciona para a rota escolhida
        })
      )
    }

    emailVerificacao(user: any){
      if(!user.emailVerified){
        sendEmailVerification(user);
        this.logout('/confirmar-email').subscribe();
      } else{
        this.router.navigate(['/'])
      }
    }

    loginGoogle(){
      return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(tap((creds) =>{
        const user = creds.user;
        const userDoc = doc(this.usuarios, user.uid);

        setDoc(userDoc, {
          uid: user.uid,
          email: user.email,
          nome: user.displayName, // 'displayName' contém o nome do usuário do google
          nick: 'Um usuário do Google'
        });

        this.router.navigate(['/'])
      })
    );
  }

  recoverPassword(email: string){
    return from(sendPasswordResetEmail(this.auth, email))
  }

}
