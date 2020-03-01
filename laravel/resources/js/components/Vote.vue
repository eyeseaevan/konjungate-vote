

Vote.vue:
<template>
   <div class="container">
      <div class="row">
         <div class="col-md-12">
            <div class="panel panel-default">
               <div class="panel-heading">
                  <h3><span class="glyphicon glyphicon-dashboard"></span> Proposal Dashboard </h3>
                  <br>
                  <button @click="initAddVote()" class="btn btn-success " style="padding:5px">
                  Add New Assignment
                  </button>
               </div>
               <div class="panel-body">
                  <table class="table table-bordered table-striped table-responsive" v-if="votes.length > 0">
                     <tbody>
                        <tr>
                           <th>
                              No.
                           </th>
                           <th>
                              Vote
                           </th>
                           <th>
                              Address
                           </th>
                           <th>
                              Signature
                           </th>
                        </tr>
                        <tr v-for="(vote, index) in votes">
                           <td>{{ index + 1 }}</td>
                           <td>
                              {{ vote.vote }}
                           </td>
                           <td>
                              {{ vote.address }}
                           </td>
                           <td>
                              {{ vote.signature }}
                           </td>
                           <td>
                              <button @click="initUpdate(index)" class="btn btn-success btn-xs" style="padding:8px"><span class="glyphicon glyphicon-edit"></span></button>
                              <button @click="deleteVote(index)" class="btn btn-danger btn-xs" style="padding:8px"><span class="glyphicon glyphicon-trash"></span></button>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
      <div class="modal fade" tabindex="-1" role="dialog" id="add_vote_model">
         <div class="modal-dialog" role="document">
            <div class="modal-content">
               <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                     aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title">Cast New Vote</h4>
               </div>
               <div class="modal-body">
                  <div class="alert alert-danger" v-if="errors.length > 0">
                     <ul>
                        <li v-for="error in errors">{{ error }}</li>
                     </ul>
                  </div>
                  <div class="form-group">
                     <label for="names">Vote:</label>
                     <input type="text" name="vote" id="vote" placeholder="Vote" class="form-control"
                        v-model="vote.vote">
                  </div>
                  <div class="form-group">
                     <label for="names">Address:</label>
                     <input type="text" name="address" id="address" placeholder="Address" class="form-control"
                        v-model="vote.address">
                  </div>
                  <div class="form-group">
                     <label for="names">Signature:</label>
                     <input type="text" name="sig" id="sig" placeholder="Signature" class="form-control"
                        v-model="vote.signature">
                  </div>
               </div>
               <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="button" @click="createVote" class="btn btn-primary">Submit</button>
               </div>
            </div>
            <!-- /.modal-content -->
         </div>
         <!-- /.modal-dialog -->
      </div>
      <!-- /.modal -->
      <div class="modal fade" tabindex="-1" role="dialog" id="update_vote_model">
         <div class="modal-dialog" role="document">
            <div class="modal-content">
               <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                     aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title">Update Vote</h4>
               </div>
               <div class="modal-body">
                  <div class="alert alert-danger" v-if="errors.length > 0">
                     <ul>
                        <li v-for="error in errors">{{ error }}</li>
                     </ul>
                  </div>
                  <div class="form-group">
                     <label>Vote:</label>
                     <input type="text" placeholder="Vote" class="form-control"
                        v-model="update_vote.vote">
                  </div>
                  <div class="form-group">
                     <label for="description">Address:</label>
                     <textarea cols="30" rows="5" class="form-control"
                        placeholder="Address" v-model="update_vote.address"></textarea>
                  </div>
                  <div class="form-group">
                     <label for="description">Signature:</label>
                     <textarea cols="30" rows="5" class="form-control"
                        placeholder="Signature" v-model="update_vote.signature"></textarea>
                  </div>
               </div>
               <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="button" @click="updateVote" class="btn btn-primary">Submit</button>
               </div>
            </div>
            <!-- /.modal-content -->
         </div>
         <!-- /.modal-dialog -->
      </div>
      <!-- /.modal -->
   </div>
</template>
<script>
   export default {
       data(){
           return {
               vote: {
                   vote: '',
                   address: '',
                   signature: ''
               },
               errors: [],
               votes: [],
               update_vote: {}
           }
       },
       mounted()
       {
           this.readVotes();
       },
       methods: {
           deleteVote(index)
           {
               let conf = confirm("Do you ready want to delete your vote?");
               if (conf === true) {
                   axios.delete('/vote/' + this.votes[index].id)
                       .then(response => {
                           this.votes.splice(index, 1);
                       })
                       .catch(error => {
                       });
               }
           },
           initAddVote()
           {
               $("#add_vote_model").modal("show");
           },
           createVote()
           {
               axios.post('/vote', {
                   vote: this.vote.vote,
                   address: this.vote.address,
                   signature: this.vote.signature,
               })
                   .then(response => {
                       this.reset();
                       this.votes.push(response.data.vote);
                       $("#add_vote_model").modal("hide");
                   })
                   .catch(error => {
                       this.errors = [];
                       if (error.response.data.errors && error.response.data.errors.vote) {
                           this.errors.push(error.response.data.errors.vote[0]);
                       }
                       if (error.response.data.errors && error.response.data.errors.address)
                      {
                           this.errors.push(error.response.data.errors.address[0]);
                       }
                       if (error.response.data.errors && error.response.data.errors.signature)
                      {
                           this.errors.push(error.response.data.errors.signature[0]);
                       }
                   });
           },
           reset()
           {
               this.vote.vote = '';
               this.vote.address = '';
               this.vote.signature = '';
           },
           readVotes()
           {
               axios.get('/vote')
                   .then(response => {
                       this.votes = response.data.votes;
                   });
           },
           initUpdate(index)
           {
               this.errors = [];
               $("#update_vote_model").modal("show");
               this.update_vote = this.votes[index];
           },
           updateVote()
           {
               axios.patch('/vote/' + this.update_vote.id, {
                    vote: this.update_vote.vote,
                    address: this.update_vote.address,
                    signature: this.update_vote.signature,
               })
                   .then(response => {
                       $("#update_vote_model").modal("hide");
                   })
                   .catch(error => {
                       this.errors = [];
                       if (error.response.data.errors.name) {
                           this.errors.push(error.response.data.errors.vote[0]);
                       }
                       if (error.response.data.errors.address) {
                           this.errors.push(error.response.data.errors.address[0]);
                       }
                       if (error.response.data.errors.signature) {
                           this.errors.push(error.response.data.errors.signature[0]);
                       }
                   });
           }
       }
   }
</script>
