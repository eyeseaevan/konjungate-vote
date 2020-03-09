<?php
namespace App\Traits;

trait genid
{
    /**
     *
     */
    protected static function boot()
    {

        parent::boot();
        self::creating(function ($model) {
            if (gettype($model->id) == 'string')
            {
              $model->id = uniqid();
            }
            else {
              $model->id = str_replace('-', '', \Uuid::generate(4)->string);
            }
        });
    }
}
