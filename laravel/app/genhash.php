<?php

use hashids\hashids;

class genhash
  {
    public static function encode(...$args){
      return app(hashids::class)->encode(...$args);
    }
    public static function decode($enc){
      if(is_int($enc)){
        return $enc;
      }

      return app(hashids::class)->decode($enc)[0];
    }
  }
