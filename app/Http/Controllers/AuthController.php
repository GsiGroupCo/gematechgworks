<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\responsable;
use App\Models\mantenimientos;
use App\Models\docs;
use App\Models\activos;
use App\Models\cargos;
use App\Models\categoria_componentes;
use App\Models\categorias_activo;
use App\Models\componentes;
use App\Models\mantenimientos_x_activos;
use App\Models\mantenimientos_x_componentes;
use App\Models\oma;
use App\Models\omc;
use App\Models\rigs;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{

    public function Home() {  
        return Inertia::render('Home',[ 
            'CategoriasActivo'           => categorias_activo::with('Activos')->get(),
            'CategoriasComponentes'      => categoria_componentes::with('Componentes')->get(),
            'Omas'                       => oma::with('Responsable','Activos')->get(),
            'Mantenimientos_activos'     => mantenimientos_x_activos::all(),
            'Mantenimientos_componentes' => mantenimientos_x_componentes::all(),
            'Omcs'                       => omc::with('Responsable','Componente')->get(),
            'Activos'                    => activos::all(),
            'Componentes'                => componentes::all(),
            'Documentos'                 => docs::all(),
            'Cargos'                     => cargos::with('Responsables')->get(), 
            'Responsables'               => responsable::with('cargo')->get(),
            'Rigs'                       => rigs::with('Movimientos.Activo')->get()
        ]);
    }
    
    public function Login()
    {
        if(auth()->check()){
            return redirect()->route('home');
        }else{
            return Inertia::render('Auth/Login');
        }
    }

    public function Token(Request $request)
    {
        $credentials = $request -> validate([
            'email' => ['required','email'],
            'password' => ['required']
        ]); 
        if(Auth::attempt($credentials)) {
            $request -> session() -> regenerate();
            return redirect() -> intended('/home');
        }
        return back() -> withErrors([
            'email' => 'Las credenciales o no son correctas o no cumplen el formato adecuado'
        ]);
    }

    public function Logout()
    {
        auth()->logout();
        return redirect()->to('/home');
    }
}
