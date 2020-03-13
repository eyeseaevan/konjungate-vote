Vote.vue:

<template>
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3><span class="glyphicon glyphicon-dashboard"></span> Proposal Dashboard </h3>
                    <br>

                </div>
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <div v-for="pageNumber in pageCount(this.proposals, 3)">
                            <li class="page-item"><a @click="setPage(pageNumber, `proposals`)" class="page-link" href="#">{{pageNumber}}</a></li>
                        </div>
                    </ul>
                </nav>

                <b-card-group deck>

                    <button v-if="this.is_admin" @click="initAddProposal()" class="btn btn-primary" style="padding: 1em; width: 1em;">
                        <p style="
    writing-mode: vertical-lr;
    margin-left: -11px;
    height: 100%;
    width: 100%;
">Add New Proposal</p>
                    </button>

                    <b-card no-body v-for="(proposal, index) in paginatedData(this.proposals, 3)" :header="'Proposal #'+proposal.id">
                        <b-card-body style="flex: 0 1 auto">
                            <h4>{{ proposal.proposal }}</h4>
                        </b-card-body>

                        <b-list-group flush>
                            <b-list-group-item v-for="{id, proposal, option, votes} in options.filter(el => el.proposal_id == proposal.id)" class="d-flex justify-content-between align-items-center">
                                <div>{{option}} <i style="font-size: .8em">[{{id}}]</i></div>
                                <div class="row justify-content-end">
                                    <b-badge variant="primary" style="padding:5px" pill>{{votes}}</b-badge>
                                </div>

                            </b-list-group-item>
                        </b-list-group>

                        <button v-if="is_admin" @click="deleteProposal(index)" class="btn btn-danger" style="margin:.6em"><span class="glyphicon glyphicon-trash">Delete Proposal</span></button>
                        <button v-if="is_admin" @click="initAddOption(proposal.id)" class="btn btn-primary" style="margin:.6em">Add Option</button>
                        <button @click="initAddVote(proposal.id)" class="btn btn-success " style="margin:.6em">Cast New Vote</button>

                    </b-card>

                </b-card-group>

                <br />
                <br />
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <div v-for="pageNumber in pageCount(this.votes, 10)">
                            <li class="page-item"><a @click="setPage(pageNumber, `votes`)" class="page-link" href="#">{{pageNumber}}</a></li>
                        </div>
                    </ul>
                </nav>

                <div class="panel-body">
                    <table class="table table-bordered table-striped table-responsive" style="border:none" v-if="votes.length > 0">
                        <tbody>
                            <tr>
                                <th>
                                    ID
                                </th>
                                <th>
                                    Proposal ID
                                </th>
                                <th>
                                    Option ID
                                </th>
                                <th>
                                    Vote Msg
                                </th>
                                <th>
                                    Address
                                </th>
                                <th>
                                    Signature
                                </th>
                                <th>
                                    MN Verified?
                                </th>
                            </tr>
                            <tr v-for="(vote, index) in paginatedData(this.votes, 10)" class="page-item">
                                <td>{{ vote.id }}</td>
                                <td>{{ vote.proposal_id }}</td>
                                <td>{{ vote.option_id }}</td>
                                <td>{{ vote.vote }}</td>
                                <td>{{ vote.address }}</td>
                                <td>{{ vote.signature }}</td>
                                <td>{{ vote.is_valid }}</td>
                                <td v-if="isUser(index)">
                                    <!-- UPDATE VOTE: <button @click="initUpdate(index)" class="btn btn-success btn-xs" style="padding:8px"><span class="glyphicon glyphicon-edit"></span></button> -->
                                    <button @click="deleteVote(index)" class="btn btn-danger btn-xs" style="padding:8px"><Octicon :icon="Octicons.x" /></button>
                                </td>
                            </tr>
                            <tr v-for="(vote, index) in paginatedData(this.votes)" class="page-item"></tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>



    <!-- ADD PROPOSAL -->
    <div class="modal fade" tabindex="-1" role="dialog" id="add_proposal_model">
        <div class="modal-dialog" role="document">
            <div class="modal-content" style="padding: 1.2em">
                <div class="modacomputed:{
            pageCount(){
            let l = this.listData.length,
            s = this.size;
            return Math.ceil(l/s);
            },l-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 v-if="is_admin" class="modal-title">Add New Proposal</h4>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" v-if="errors.length > 0">
                        <ul>
                            <li v-for="error in errors">{{ error }}</li>
                        </ul>
                    </div>
                    <div class="form-group">
                        <label for="names">Proposal:</label>
                        <input type="text" name="proposal" id="proposal" placeholder="Proposal" class="form-control" v-model="proposal.proposal">
                    </div>
                    <div class="form-group">
                        <label for="names">Expiry:</label>
                        <input type="text" name="expiry" id="expiry" placeholder="Expiry" class="form-control" v-model="proposal.expiry">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" @click="createProposal" class="btn btn-primary">Submit</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>

    <!-- ADD OPTION -->
    <div class="modal fade" tabindex="-1" role="dialog" id="add_option_model">
        <div class="modal-dialog" role="document">
            <div class="modal-content" style="padding: 1.2em">
                <div class="modacomputed:{
                pageCount(){
                let l = this.listData.length,
                s = this.size;
                return Math.ceil(l/s);
                },l-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Add new option to proposal:</h4>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" v-if="errors.length > 0">
                        <ul>
                            <li v-for="error in errors">{{ error }}</li>
                        </ul>
                    </div>
                    <div class="form-group">
                        <label for="names">Option:</label>
                        <input type="text" name="option" id="option" placeholder="Option" class="form-control" v-model="option.option">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" @click="createOption" class="btn btn-primary">Submit</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>

    <!-- ADD VOTE -->
    <div class="modal fade" tabindex="-1" role="dialog" id="add_vote_model">
        <div class="modal-dialog" style="word-wrap: break-word" role="document">
            <div class="modal-content" style="padding: 1.2em">
                <div class="modacomputed:{
              pageCount(){
              let l = this.listData.length,
              s = this.size;
              return Math.ceil(l/s);
              },l-header">
                    <button @click="convertProposals()" type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Cast New Vote</h4>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" v-if="errors.length > 0">
                        <ul>
                            <li v-for="error in errors">{{ error }}</li>
                        </ul>
                    </div>
                    <div class="form-group">
                        <b-select v-model="vote.proposal_id" class="mb-3">
                            <b-select-option v-for="proposal in this.proposals" :value="proposal.id">
                                {{ proposal.proposal }}
                            </b-select-option>
                        </b-select>
                        <div v-if="vote.proposal_id">Selected proposal: {{ this.proposals.filter(el => el.id == vote.proposal_id)[0].proposal }}</div>
                    </div>

                    <div class="form-group">
                        <b-select v-model="vote.option_id" class="mb-3">
                            <b-select-option v-for="option in this.options.filter(el => el.proposal_id == vote.proposal_id)" :value="option.id">
                                {{ option.option }}
                            </b-select-option>
                        </b-select>
                        <div v-if="vote.option_id">Selected option: {{ this.options.filter(el => el.id == vote.option_id)[0].option }}</div>
                    </div>

                    <div class="form-group">
                        <label for="names">Vote Msg <i>(does not affect polling)</i>:</label>
                        <input type="text" name="vote" id="vote" placeholder="Vote" class="form-control" v-model="vote.vote">
                    </div>
                    <div class="form-group">
                        <label for="names">Address:</label>
                        <input type="text" name="address" id="address" placeholder="Address" class="form-control" v-model="vote.address">
                    </div>
                    <div class="form-group">
                        <label style="width:100%" for="names"><b>Sign: </b>
                            <br>{{`${this.vote.proposal_id}/${this.vote.option_id}/${this.vote.vote}/${this.vote.address}`}}</label>
                        <input type="text" name="sig" id="sig" placeholder="Signature" class="form-control" v-model="vote.signature">
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
            <div class="modal-content" style="padding: 1.2em">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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
                        <input type="text" placeholder="Vote" class="form-control" v-model="update_vote.vote">
                    </div>
                    <div class="form-group">
                        <label for="description">Address:</label>
                        <textarea cols="30" rows="5" class="form-control" placeholder="Address" v-model="update_vote.address"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="description">Signature:</label>
                        <textarea cols="30" rows="5" class="form-control" placeholder="Signature" v-model="update_vote.signature"></textarea>
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
import Octicon, { Octicons } from 'octicons-vue';
import axios from "axios";
export default {
  components: { Octicon },
    data() {
        return {
            Octicons,
            is_signed: '',
            sproposal: 0,
            soption: [],
            proposals: [],
            options: [],
            is_valid: {
                sig: '',
                mn: '',
            },
            votes: [],
            vote: {
                user_id: '',
                proposal_id: '',
                option_id: '',
                vote: '',
                address: '',
                signature: '',
            },
            proposal: {
                username: '',
                user_id: '',
                proposal: '',
                expiry: '',
            },
            option: {
                id: '',
                user_id: '',
                username: '',
                proposal_id: 0,
                option: 0,
                user_id: '',
            },
            errors: [],
            update_vote: {},
            p_pageNumber: 0,
            v_pageNumber: 0,
            logged_in: false,
            user_id: '',
            is_admin: false,
        }
    },
    props: {},
    mounted() {
        this.readData();
    },
    computed: {
        url: function() {
            return window.location.hostname;
        },
        /*
         selectoptions(){
           return this.proposals.map((currentProposal) => ({
                value: currentProposal.id,
                text: currentProposal.proposal
            }));
           }
        */
    },
    methods: {
        paginatedData($array, $count) {
            const start = this.p_pageNumber * $count,
                end = start + $count;
            return $array.slice(start, end);
        },
        pageCount($array, $count) {
            let l = $array.length;
            return Math.ceil(l / $count);
        },
        isUser(index) {
            if (this.votes[index].user_id == this.user_id) {
                return true;
            }

        },
        setPage(i, set) {
            i--;
            if(set == 'proposals')
            {
              this.p_pageNumber = i;
            }
            else if (set == 'votes')
            {
            this.v_pageNumber = i;
            }
        },
        prevPage(set) {
        if(set== 1)
        {
          this.p_pageNumber--;
        }
        else if (set=="votes")
        {
        this.v_pageNumber--;
        }
        },
        deleteVote(index) {
            let conf = confirm("Do you really wish to delete your vote?");
            if (conf === true) {
                axios.delete('/vote/' + this.votes[index].id)
                    .then(response => {
                        this.votes.splice(index, 1);
                    })
                    .catch(error => {});
            }
        },
        deleteProposal(index) {
            let conf = confirm("Do you really wish to delete this proposal, all its options, and all its votes?");
            if (conf === true) {
                axios.delete('/proposal/' + this.proposals[index].id)
                    .then(response => {
                        this.proposals.splice(index, 1);
                    })
                    .catch(error => {});
            }
        },
        initAddProposal() {
            $("#add_proposal_model").modal("show");
        },
        initAddOption(proposalid) {
            this.option.proposal_id = proposalid;
            $("#add_option_model").modal("show");
        },
        initAddVote(proposalid) {
            this.vote.proposal_id = proposalid;
            $("#add_vote_model").modal("show");
        },
        createProposal() {
            axios.post('/proposal', {
                    proposal: this.proposal.proposal,
                    expiry: this.proposal.expiry,
                })
                .then(response => {
                    this.reset();
                    this.proposals.push(response.data.proposal);
                    $("#add_proposal_model").modal("hide");
                })
                .catch(error => {
                    this.errors = [];
                    if (error.response.data.errors && error.response.data.errors.proposal) {
                        this.errors.push(error.response.data.errors.proposal[0]);
                    }
                    if (error.response.data.errors && error.response.data.errors.expiry) {
                        this.errors.push(error.response.data.errors.expiry[0]);
                    }
                });
        },
        createOption() {
            axios.post('/option', {
                    proposal_id: this.option.proposal_id,
                    option: this.option.option,
                })
                .then(response => {
                    this.reset();
                    this.options.push(response.data.option);
                    $("#add_option_model").modal("hide");
                })
                .catch(error => {
                    this.errors = [];
                    if (error.response.data.errors && error.response.data.errors.proposal_id) {
                        this.errors.push(error.response.data.errors.proposal[0]);
                    }
                    if (error.response.data.errors && error.response.data.errors.expiry) {
                        this.errors.push(error.response.data.errors.option[0]);
                    }
                });
        },
        createVote() {
            const address = encodeURIComponent(this.vote.address);
            const msg = encodeURIComponent(`${this.vote.proposal_id}/${this.vote.option_id}/${this.vote.vote}/${this.vote.address}`);
            const signature = encodeURIComponent(this.vote.signature);
            axios({
                method: "GET",
                "url": `http://${this.url}:3333/api/msg?address=${address}&message=${msg}&signature=${signature}`
            }).then(result => {
                if (result.data) {
                    axios({
                        method: "GET",
                        "url": `http://${this.url}:3333/api/mn?address=${address}`
                    }).then(result => {
                        if (result.data) {
                            axios.post('/vote', {
                                    proposal_id: this.vote.proposal_id,
                                    option_id: this.vote.option_id,
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
                                    if (error.response.data.errors && error.response.data.errors.proposal) {
                                        this.errors.push(error.response.data.errors.proposal[0]);
                                    }
                                    if (error.response.data.errors && error.response.data.errors.option) {
                                        this.errors.push(error.response.data.errors.option[0]);
                                    }
                                    if (error.response.data.errors && error.response.data.errors.vote) {
                                        this.errors.push(error.response.data.errors.vote[0]);
                                    }
                                    if (error.response.data.errors && error.response.data.errors.address) {
                                        this.errors.push(error.response.data.errors.address[0]);
                                    }
                                    if (error.response.data.errors && error.response.data.errors.signature) {
                                        this.errors.push(error.response.data.errors.signature[0]);
                                    }
                                    if (error.response.data.errors && error.response.data.errors.is_valid) {
                                        this.errors.push(error.response.data.errors.is_valid[0]);
                                    }
                                });
                        } else {
                            this.errors.push("Valid signature for vote, but no masternode associated with the address used to sign.");
                        }
                    }, error => {
                        this.errors.push("Cannot connect to Konjungate API.");
                    });
                } else {
                    this.errors.push("Invalid signature for vote. Please double check your entries.");
                }
            }, error => {
                this.errors.push("Cannot connect to Konjungate API.");
            });
        },
        reset() {
            this.vote.vote = '';
            this.vote.address = '';
            this.vote.signature = '';
        },
        readData() {
            axios.get('/proposal')
                .then(response => {
                    this.proposals = response.data.proposals;
                });

            axios.get('/option')
                .then(response => {
                    this.options = response.data.options;
                });

            axios.get('/vote')
                .then(response => {
                    this.votes = response.data.votes;
                });
            axios.get('/auth')
                .then(response => {
                    this.logged_in = response.data.logged_in;
                    this.user_id = response.data.user_id;
                    this.is_admin = response.data.is_admin;
                });
        },
        initUpdate(index) {
            this.errors = [];
            $("#update_vote_model").modal("show");
            this.update_vote = this.votes[index];
        },
        updateVote() {
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
                    if (error.response.data.errors.is_valid) {
                        this.errors.push(error.response.data.errors.is_valid[0]);
                    }
                });
        }
    }
}
</script>
