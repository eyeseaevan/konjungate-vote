<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\genid;

class Vote extends Model
{
  use genid;
  protected $table = 'votes';
  protected $guarded = ['id'];
  public $idtype = 'uuid';
  public $uuid = 'id';

  public $incrementing = false;
  protected $fillable = [
    'id',
    'proposal_id',
    'option_id',
    'vote',
    'address',
    'signature',
    'user_id',
    'is_valid'
  ];
}
