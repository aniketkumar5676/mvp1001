
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf'
import logo from '../../components/images/logo.png'

const Pdf= function Pdf(payment) {

     var doc =new jsPDF();
        doc.addImage(logo,"PNG",15,10,40,15)

         autoTable(doc,{
            body: [
              [
                {
                  content: 'Kotak GiftCard',
                  styles: {
                    halign: 'left',
                    fontSize: 20,
                    textColor: '#ffffff'
                  }
                },
                {
                  content: 'Invoice',
                  styles: {
                    halign: 'right',
                    fontSize: 20,
                    textColor: '#ffffff'
                  }
                }
              ],
            ],
            theme: 'plain',
            margin: { top: 40 },
            styles: {
              fillColor: '#ff0000'
            }
          });
      
          autoTable(doc, {
            body: [
              [
                {
                  content: 'Order Id: '+payment.orderId
                  +'\nDate: '+ payment.date,
                  styles: {
                    halign: 'right'
                  }
                }
              ],
            ],
            theme: 'plain'
          });
      
          autoTable(doc, {
            body: [
              [
                {
                  content: 'Billed to:'
                  +'\nName: '+payment.customerName
                  +'\nEmail Id:'+payment.email,
                  styles: {
                    halign: 'left'
                  }
                },
                
                {
                  content: 'From:'
                  +'\nKotak Gift Card'
                  +'\nParsa Market Near,'
                  +'\nAnishabad Delhi'
                  +'\nPin Code - 100001'
                  +'\nCountry: India',
                  styles: {
                    halign: 'right'
                  }
                }
              ],
            ],
            theme: 'plain'
          });
      
          autoTable(doc, {
            body: [
              [
                {
                  content: 'Amount Paid:',
                  styles: {
                    halign:'right',
                    fontSize: 14
                  }
                }
              ],
              [
                {
                  content: payment.amount,
                  styles: {
                    halign:'right',
                    fontSize: 20,
                    textColor: '#44AA3A'
                  }
                }
              ],
            ],
            theme: 'plain'
          });
      
          autoTable(doc, {
            body: [
              [
                {
                  content: 'Products & Services',
                  styles: {
                    halign:'left',
                    fontSize: 14
                  }
                }
              ]
            ],
            theme: 'plain'
          });
      
          autoTable(doc, {
            head: [['S_No','Gift_Card_Id', 'Gift_Card_Name', 'Merchant', 'Price','gst', 'Amount']],
            body: [
              [1,payment.giftCardId, payment.giftCardName,payment.merchantName, payment.amount,0,payment.amount]
             ],
            theme: 'striped',
            headStyles:{
              fillColor: '#343a40'
            }
          });
      
          autoTable(doc, {
            body: [
              [
                {
                  content: 'Subtotal:',
                  styles:{
                    halign:'right'
                  }
                },
                {
                  content: payment.amount,
                  styles:{
                    halign:'right'
                  }
                },
              ],
              [
                {
                  content: 'Total tax:',
                  styles:{
                    halign:'right'
                  }
                },
                {
                  content: 'Rs 0',
                  styles:{
                    halign:'right'
                  }
                },
              ],
              [
                {
                  content: 'Total amount:',
                  styles:{
                    halign:'right'
                  }
                },
                {
                  content: payment.amount,
                  styles:{
                    halign:'right'
                  }
                },
              ],
            ],
            theme: 'plain'
          });
      
          autoTable(doc, {
            body: [
              [
                {
                  content: 'This is a computer-generated document. No signature is required',
                  styles: {
                    halign: 'left',
                    fontSize: 14
                  }
                }
              ],
              [
                {
                  content: 'The aforementioned data shall constitute the agreed contractual quality of the product at the time of passing of risk'
                  +'The data are controlled at regular intervals as part of our quality assurance program',
                   styles: {
                    halign: 'left'
                  }
                }
              ],
            ],
            theme: "plain"
          });
      
        doc.autoPrint();
        window.open(doc.output('bloburl'));
     

}
export default Pdf;