<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Proposal extends Model
{
  protected $fillable = [
    'id',
    'proposal',
    'expiry',
    'user_id',
  ];
}
