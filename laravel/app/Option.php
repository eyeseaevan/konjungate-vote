<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\genid;

class Option extends Model
{
  use genid;
  public $incrementing = false;
  protected $uuidFieldName = 'id';
  protected $fillable = [
    'proposal_id',
    'option',
    'votes',
    'user_id',
    'is_valid'
  ];
}
