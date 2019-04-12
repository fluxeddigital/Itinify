<?php

namespace App\Mail;

use App\Package;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ClientPackageAccepted extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The package instance.
     *
     * @var Package
     */
    public $package;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Package $package)
    {
        $this->package = $package;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.client-package-accepted');
    }
}
